import { ClientError, GraphQLClient, type RequestDocument, type Variables } from "graphql-request";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { tokenManager } from "@/features/auth/utils/token-manager";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import type { AuthUser } from "@/types/auth";

type GraphQLRequestOptions = {
  headers?: HeadersInit;
  skipAuthRetry?: boolean;
};

const REFRESH_MUTATION = /* GraphQL */ `
  mutation RefreshToken {
    refresh {
      accessToken
      user {
        id
        email
        name
        roles
        isVerified
        hasPin
        onboardingComplete
        subscriptionActive
        avatarUrl
      }
    }
  }
`;

export class AppGraphQLError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "AppGraphQLError";
  }
}

export const graphqlClient = new GraphQLClient(env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
  credentials: "include",
});

function isUnauthorized(error: unknown) {
  if (!(error instanceof ClientError)) return false;

  return (
    error.response.status === 401 ||
    error.response.errors?.some((item) => item.extensions?.code === "UNAUTHENTICATED")
  );
}

function normalizeGraphQLError(error: unknown) {
  if (error instanceof ClientError) {
    const graphQLError = error.response.errors?.[0];

    return new AppGraphQLError(
      graphQLError?.message ?? error.message,
      error.response.status,
      typeof graphQLError?.extensions?.code === "string" ? graphQLError.extensions.code : undefined,
    );
  }

  if (error instanceof Error) {
    return new AppGraphQLError(error.message);
  }

  return new AppGraphQLError("Unexpected GraphQL request failure.");
}

async function refreshAccessToken() {
  const refreshClient = new GraphQLClient(env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    credentials: "include",
  });

  const data = await refreshClient.request<{
    refresh: {
      accessToken: string;
      user: AuthUser;
    };
  }>(REFRESH_MUTATION);

  useAuthStore.getState().setSession(data.refresh);
  return data.refresh.accessToken;
}

export async function graphqlRequest<TData, TVariables extends Variables = Variables>(
  document: RequestDocument,
  variables?: TVariables,
  options: GraphQLRequestOptions = {},
): Promise<TData> {
  const token = tokenManager.getAccessToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  try {
    return await graphqlClient.request<TData, TVariables>(document, variables as TVariables, headers);
  } catch (error) {
    if (!options.skipAuthRetry && isUnauthorized(error)) {
      try {
        const refreshedToken = await tokenManager.refresh(refreshAccessToken);
        if (refreshedToken) {
          const retryHeaders = new Headers(options.headers);
          retryHeaders.set("authorization", `Bearer ${refreshedToken}`);
          return await graphqlClient.request<TData, TVariables>(document, variables as TVariables, retryHeaders);
        }
      } catch (refreshError) {
        logger.warn("Unable to refresh access token.", { refreshError });
        tokenManager.clear();
      }
    }

    throw normalizeGraphQLError(error);
  }
}
