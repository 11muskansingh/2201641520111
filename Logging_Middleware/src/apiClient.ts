// Handles API requests to the test server
export interface LogRequest {
  stack: string;
  level: string;
  package: string;
  message: string;
}

export interface LogResponse {
  status: string;
  timestamp?: string;
}

// Functions for making authenticated log requests will be implemented here
