import axios, { AxiosInstance } from "axios";
import {
  Stack,
  Level,
  Package,
  LoggerConfig,
  BackendPackage,
  FrontendPackage,
  CommonPackage,
} from "./types";
import { LogRequest, LogResponse } from "./types/logging";
import { AuthManager } from "./authManager";

const BASE_URL = "http://20.244.56.144/evaluation-service";

export class Logger {
  private authManager: AuthManager;
  private axiosInstance: AxiosInstance;

  constructor(config: LoggerConfig) {
    this.authManager = new AuthManager(config);
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private validateStack(stack: string): boolean {
    return Object.values(Stack).includes(stack as Stack);
  }

  private validateLevel(level: string): boolean {
    return Object.values(Level).includes(level as Level);
  }

  private validatePackage(pkg: string): boolean {
    return Object.values({
      ...BackendPackage,
      ...FrontendPackage,
      ...CommonPackage,
    }).includes(pkg as Package);
  }

  private async getAuthenticatedAxiosInstance(): Promise<AxiosInstance> {
    const token = await this.authManager.authenticate();
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async log(
    stack: string,
    level: string,
    pkg: string,
    message: string
  ): Promise<LogResponse> {
    // Validate input parameters
    if (!this.validateStack(stack)) {
      throw new Error(
        `Invalid stack value: ${stack}. Must be one of: ${Object.values(
          Stack
        ).join(", ")}`
      );
    }

    if (!this.validateLevel(level)) {
      throw new Error(
        `Invalid level value: ${level}. Must be one of: ${Object.values(
          Level
        ).join(", ")}`
      );
    }

    if (!this.validatePackage(pkg)) {
      throw new Error(
        `Invalid package value: ${pkg}. Must be one of the valid package names`
      );
    }

    if (!message || message.trim() === "") {
      throw new Error("Message cannot be empty");
    }

    const logData: LogRequest = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: pkg.toLowerCase(),
      message,
    };

    try {
      const axiosInstance = await this.getAuthenticatedAxiosInstance();
      const response = await axiosInstance.post<LogResponse>("/logs", logData);
      return response.data;
    } catch (error) {
      throw new Error("Log request failed: " + (error as Error).message);
    }
  }
}
