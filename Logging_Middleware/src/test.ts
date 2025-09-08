import {
  Stack,
  Level,
  BackendPackage,
  FrontendPackage,
  CommonPackage,
} from "./types";
import { Logger } from "./logger";

async function testLogger() {
  // Create logger instance
  const logger = new Logger({
    email: "spariharmuskan1106@gmail.com",
    name: "Muskan Singh",
    rollNo: "2201641520111",
    accessCode: "sAWTuR",
    clientID: "3b7fef23-a23e-4726-a0a2-7c1f18e9b03f",
    clientSecret: "PdRHxmyKVPqcAAcy",
  });

  try {
    console.log("Testing Backend Logs...");

    // Test backend error log
    console.log("\n1. Testing backend error log...");
    const result1 = await logger.log(
      Stack.BACKEND,
      Level.ERROR,
      BackendPackage.HANDLER,
      "received string, expected bool"
    );
    console.log("Backend error log successful:", result1);

    // Test backend fatal log
    console.log("\n2. Testing backend fatal log...");
    const result2 = await logger.log(
      Stack.BACKEND,
      Level.FATAL,
      BackendPackage.DB,
      "Critical database connection failure."
    );
    console.log("Backend fatal log successful:", result2);

    console.log("\nTesting Frontend Logs...");

    // Test frontend error log
    console.log("\n3. Testing frontend error log...");
    const result3 = await logger.log(
      Stack.FRONTEND,
      Level.ERROR,
      FrontendPackage.COMPONENT,
      "Component failed to render"
    );
    console.log("Frontend error log successful:", result3);

    // Test common package log
    console.log("\n4. Testing common package log...");
    const result4 = await logger.log(
      Stack.BACKEND,
      Level.INFO,
      CommonPackage.AUTH,
      "User authentication successful"
    );
    console.log("Common package log successful:", result4);

    console.log("\nAll tests completed successfully!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the tests
console.log("Starting logger tests...\n");
testLogger();
