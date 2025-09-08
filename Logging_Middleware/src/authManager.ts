import axios, { AxiosInstance } from "axios";
import {
  AuthRequest,
  AuthResponse,
  RegistrationRequest,
  RegistrationResponse,
} from "./auth";
import { LoggerConfig } from "./types";

const BASE_URL = "http://20.244.56.144/evaluation-service";

export class AuthManager {
  private config: LoggerConfig;
  private token: string | null = null;
  private expiresAt: number = 0;
  private axiosInstance: AxiosInstance;

  private validateConfig(config: LoggerConfig): void {
    if (!config.email || !config.email.includes("@")) {
      throw new Error("Invalid email address");
    }
    if (!config.name || config.name.trim().length === 0) {
      throw new Error("Name is required");
    }
    if (!config.rollNo || config.rollNo.trim().length === 0) {
      throw new Error("Roll number is required");
    }
    if (!config.accessCode || config.accessCode.trim().length === 0) {
      throw new Error("Access code is required");
    }
    if (!config.clientID || config.clientID.trim().length === 0) {
      throw new Error("Client ID is required");
    }
    if (!config.clientSecret || config.clientSecret.trim().length === 0) {
      throw new Error("Client secret is required");
    }
  }

  constructor(config: LoggerConfig) {
    this.validateConfig(config);
    this.config = config;
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async register(): Promise<RegistrationResponse> {
    const registrationData: RegistrationRequest = {
      email: this.config.email,
      name: this.config.name,
      mobileNo: "", // Should be provided in config
      githubUsername: "", // Should be provided in config
      rollNo: this.config.rollNo,
      accessCode: this.config.accessCode,
    };

    try {
      const response = await this.axiosInstance.post<RegistrationResponse>(
        "/register",
        registrationData
      );
      return response.data;
    } catch (error) {
      throw new Error("Registration failed: " + (error as Error).message);
    }
  }

  async authenticate(): Promise<string> {
    if (this.token && Date.now() < this.expiresAt) {
      return this.token;
    }

    const authData: AuthRequest = {
      email: this.config.email,
      name: this.config.name,
      rollNo: this.config.rollNo,
      accessCode: this.config.accessCode,
      clientID: this.config.clientID,
      clientSecret: this.config.clientSecret,
    };

    try {
      const response = await this.axiosInstance.post<AuthResponse>(
        "/auth",
        authData
      );

      if (!response.data.access_token) {
        throw new Error("No access token received from server");
      }

      this.token = response.data.access_token;
      // expires_in is a timestamp, not duration
      this.expiresAt = response.data.expires_in;
      return this.token;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `Authentication failed: ${
            error.response.data.message || error.response.data || error.message
          }`
        );
      }
      throw new Error(`Authentication failed: ${(error as Error).message}`);
    }
  }
}
