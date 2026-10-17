import type {
  AuthResponse,
  CheckEmailInput,
  CheckEmailResult,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "@/features/auth/types/auth.types";
import { graphqlRequest } from "@/lib/graphql-client";

const CHECK_EMAIL_QUERY = /* GraphQL */ `
  query CheckEmail($input: CheckEmailInput!) {
    checkEmail(input: $input) {
      exists
      registrationType
    }
  }
`;

const LOGIN_MUTATION = /* GraphQL */ `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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

const REGISTER_MUTATION = /* GraphQL */ `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
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

const LOGOUT_MUTATION = /* GraphQL */ `
  mutation Logout {
    logout
  }
`;

const FORGOT_PASSWORD_MUTATION = /* GraphQL */ `
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input)
  }
`;

const RESET_PASSWORD_MUTATION = /* GraphQL */ `
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

export const authApi = {
  async checkEmail(input: CheckEmailInput) {
    const data = await graphqlRequest<
      { checkEmail: CheckEmailResult },
      { input: CheckEmailInput }
    >(CHECK_EMAIL_QUERY, { input });
    return data.checkEmail;
  },
  async login(input: LoginInput) {
    const data = await graphqlRequest<{ login: AuthResponse }, { input: LoginInput }>(LOGIN_MUTATION, { input });
    return data.login;
  },
  async register(input: RegisterInput) {
    const data = await graphqlRequest<{ register: AuthResponse }, { input: RegisterInput }>(REGISTER_MUTATION, { input });
    return data.register;
  },
  async refresh() {
    const data = await graphqlRequest<{ refresh: AuthResponse }>(REFRESH_MUTATION, undefined, {
      skipAuthRetry: true,
    });
    return data.refresh;
  },
  async logout() {
    const data = await graphqlRequest<{ logout: boolean }>(LOGOUT_MUTATION);
    return data.logout;
  },
  async forgotPassword(input: ForgotPasswordInput) {
    const data = await graphqlRequest<{ forgotPassword: boolean }, { input: ForgotPasswordInput }>(FORGOT_PASSWORD_MUTATION, { input });
    return data.forgotPassword;
  },
  async resetPassword(input: ResetPasswordInput) {
    const data = await graphqlRequest<{ resetPassword: boolean }, { input: ResetPasswordInput }>(RESET_PASSWORD_MUTATION, { input });
    return data.resetPassword;
  },
};
