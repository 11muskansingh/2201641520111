import { Logger } from "./logger";
import {
  Stack,
  Level,
  BackendPackage,
  FrontendPackage,
  CommonPackage,
} from "./types";
export {
  Stack,
  Level,
  BackendPackage,
  FrontendPackage,
  CommonPackage,
  LoggerConfig,
} from "./types";

export { Logger };

// Main Log function for easy usage
export function createLogger(config: {
  email: string;
  name: string;
  rollNo: string;
  accessCode: string;
  clientID: string;
  clientSecret: string;
}): Logger {
  return new Logger(config);
}
