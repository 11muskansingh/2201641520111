import { createLogger, Stack, Level, BackendPackage } from "../src/index.js";

// Create a logger instance with your credentials
const logger = createLogger({
  email: "spariharmuskan1106@gmail.com",
  name: "Muskan Singh",
  rollNo: "2201641520111", // Please replace with your actual roll number
  accessCode: "sAWTuR",
  clientID: "3b7fef23-a23e-4726-a0a2-7c1f18e9b03f",
  clientSecret: "PdRHxmyKVPqcAAcy",
});

// Example usage
async function testLogger() {
  try {
    // Test a handler error log
    console.log("Sending handler error log...");
    await logger.log(
      Stack.BACKEND,
      Level.ERROR,
      BackendPackage.HANDLER,
      "received string, expected bool"
    );
    console.log("Handler error log sent successfully!");

    // Test a database error log
    console.log("\nSending database error log...");
    await logger.log(
      Stack.BACKEND,
      Level.FATAL,
      BackendPackage.DB,
      "Critical database connection failure."
    );
    console.log("Database error log sent successfully!");
  } catch (error) {
    console.error("Error while logging:", error);
  }
}

// Run the test
console.log("Starting logger test...\n");
testLogger();
