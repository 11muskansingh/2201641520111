// Valid values for stack parameter
export enum Stack {
  BACKEND = "backend",
  FRONTEND = "frontend",
}

// Valid values for log levels
export enum Level {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  FATAL = "fatal",
}

// Valid values for package parameter
export enum BackendPackage {
  CACHE = "cache",
  CONTROLLER = "controller",
  CRON_JOB = "cron_job",
  DB = "db",
  DOMAIN = "domain",
  HANDLER = "handler",
  REPOSITORY = "repository",
  ROUTE = "route",
  SERVICE = "service",
}

export enum FrontendPackage {
  API = "api",
  COMPONENT = "component",
  HOOK = "hook",
  PAGE = "page",
  STATE = "state",
  STYLE = "style",
}

export enum CommonPackage {
  AUTH = "auth",
  CONFIG = "config",
  MIDDLEWARE = "middleware",
  UTILS = "utils",
}

export type Package = BackendPackage | FrontendPackage | CommonPackage;

// Configuration interface
export interface LoggerConfig {
  email: string;
  name: string;
  rollNo: string;
  accessCode: string;
  clientID: string;
  clientSecret: string;
}
