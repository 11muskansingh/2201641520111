import { createLogger, Stack, Level, BackendPackage } from "../src";

// Create a logger instance
const logger = createLogger({
  email: "spariharmuskan1106@gmail.com",
  name: "Muskan Singh",
  rollNo: "2201641520111",
  accessCode: "sAWTuR",
  clientID: "3b7fef23-a23e-4726-a0a2-7c1f18e9b03f",
  clientSecret: "PdRHxmyKVPqcAAcy",
});

// Example usage
async function demonstrateLogging() {
  try {
    await logger.log(
      Stack.BACKEND,
      Level.ERROR,
      BackendPackage.HANDLER,
      "received string, expected bool"
    );

    // Log a database connection issue
    await logger.log(
      Stack.BACKEND,
      Level.FATAL,
      BackendPackage.DB,
      "Critical database connection failure."
    );

    console.log("Logs sent successfully!");
  } catch (error) {
    console.error("Error sending logs:", error);
  }
}

demonstrateLogging();
