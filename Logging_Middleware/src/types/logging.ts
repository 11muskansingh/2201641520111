// Types for logging requests and responses
export interface LogRequest {
  stack: string;
  level: string;
  package: string;
  message: string;
}

export interface LogResponse {
  logID: string;
  message: string;
}
