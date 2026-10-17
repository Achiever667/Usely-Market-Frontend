import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: z.string().url().default("http://localhost:3000/graphql"),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().default("en"),
  AUTH_COOKIE_NAME: z.string().default("usely_access_token"),
  REFRESH_COOKIE_NAME: z.string().default("usely_refresh_token"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME,
  REFRESH_COOKIE_NAME: process.env.REFRESH_COOKIE_NAME,
  NODE_ENV: process.env.NODE_ENV,
});

export type AppEnv = z.infer<typeof envSchema>;
