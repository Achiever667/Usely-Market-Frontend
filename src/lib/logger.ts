type LogContext = Record<string, unknown>;

const isProduction = process.env.NODE_ENV === "production";

export const logger = {
  info(message: string, context?: LogContext) {
    if (!isProduction) console.info(message, context ?? "");
  },
  warn(message: string, context?: LogContext) {
    console.warn(message, context ?? "");
  },
  error(message: string, context?: LogContext) {
    console.error(message, context ?? "");
  },
};
