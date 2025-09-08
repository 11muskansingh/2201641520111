// Constants
export const BASE_URL = "http://20.244.56.144/evaluation-service";

// API endpoints
export const ENDPOINTS = {
  AUTH: "/auth",
  LOGS: "/logs",
} as const;

// HTTP headers
export const HEADERS = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization",
} as const;

// Error messages
export const ERRORS = {
  INVALID_STACK: (stack: string, validValues: string[]) =>
    `Invalid stack value: ${stack}. Must be one of: ${validValues.join(", ")}`,
  INVALID_LEVEL: (level: string, validValues: string[]) =>
    `Invalid level value: ${level}. Must be one of: ${validValues.join(", ")}`,
  INVALID_PACKAGE: (pkg: string) =>
    `Invalid package value: ${pkg}. Must be one of the valid package names`,
  EMPTY_MESSAGE: "Message cannot be empty",
  AUTH_FAILED: (message: string) => `Authentication failed: ${message}`,
  LOG_FAILED: (message: string) => `Log request failed: ${message}`,
  INVALID_CONFIG: (field: string) => `${field} is required and must be valid`,
  TOKEN_EXPIRED: "Authentication token has expired",
} as const;
