import axios from "axios";

const BASE_URL = "http://20.244.56.144/evaluation-service";

// Your access token from registration/auth
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcGFyaWhhcm11c2thbjExMDZAZ21haWwuY29tIiwiZXhwIjoxNzU3MzI1MzUwLCJpYXQiOjE3NTczMjQ0NTAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2OGVmYTViOC02OWFiLTQ5ZTUtODQzMC0yOWFkODRjNTE2MGQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtdXNrYW4gc2luZ2giLCJzdWIiOiIzYjdmZWYyMy1hMjNlLTQ3MjYtYTBhMi03YzFmMThlOWIwM2YifSwiZW1haWwiOiJzcGFyaWhhcm11c2thbjExMDZAZ21haWwuY29tIiwibmFtZSI6Im11c2thbiBzaW5naCIsInJvbGxObyI6InlvdXJfcm9sbF9ubyIsImFjY2Vzc0NvZGUiOiJzQVdUdVIiLCJjbGllbnRJRCI6IjNiN2ZlZjIzLWEyM2UtNDcyNi1hMGEyLTdjMWYxOGU5YjAzZiIsImNsaWVudFNlY3JldCI6IlBkUkh4bXlLVlBxY0FBY3kifQ.2jqrlCtiPefZy1Tq2iprxN0XtY0fBjlZrt346irX6JI";

// Validate inputs
function validateStack(stack) {
  const validStacks = ["backend", "frontend"];
  return validStacks.includes(stack);
}

function validateLevel(level) {
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  return validLevels.includes(level);
}

function validatePackage(pkg) {
  const backendPackages = [
    "cache",
    "controller",
    "cron_job",
    "db",
    "domain",
    "handler",
    "repository",
    "route",
    "service",
  ];
  const frontendPackages = [
    "api",
    "component",
    "hook",
    "page",
    "state",
    "style",
  ];
  const commonPackages = ["auth", "config", "middleware", "utils"];

  return [...backendPackages, ...frontendPackages, ...commonPackages].includes(
    pkg
  );
}

// Main logging function
async function Log(stack, level, pkg, message) {
  // Convert to lowercase and validate
  stack = stack.toLowerCase();
  level = level.toLowerCase();
  pkg = pkg.toLowerCase();

  // Validate inputs
  if (!validateStack(stack)) {
    throw new Error(`Invalid stack: ${stack}`);
  }
  if (!validateLevel(level)) {
    throw new Error(`Invalid level: ${level}`);
  }
  if (!validatePackage(pkg)) {
    throw new Error(`Invalid package: ${pkg}`);
  }
  if (!message || message.trim() === "") {
    throw new Error("Message cannot be empty");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/logs`,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Log request failed: ${error.response?.data?.message || error.message}`
    );
  }
}

// Test the logging function
async function test() {
  try {
    // Test backend error log
    console.log("Testing backend error log...");
    const result1 = await Log(
      "backend",
      "error",
      "handler",
      "received string, expected bool"
    );
    console.log("Log created:", result1);

    // Test backend fatal log
    console.log("\nTesting backend fatal log...");
    const result2 = await Log(
      "backend",
      "fatal",
      "db",
      "Critical database connection failure"
    );
    console.log("Log created:", result2);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run the test
console.log("Starting log tests...\n");
test();
