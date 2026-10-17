import { APP_NAME, DEFAULT_LOCALE, ROUTES } from "@/lib/constants";

export const appConfig = {
  name: APP_NAME,
  defaultLocale: DEFAULT_LOCALE,
  routes: ROUTES,
  supportedLocales: ["en"],
  marketplace: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
} as const;
