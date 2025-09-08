import { AuthManager } from "./authManager";

async function testAuth() {
  // Test configuration
  const config = {
    email: "spariharmuskan1106@gmail.com",
    name: "Muskan Singh",
    rollNo: "YOUR_ROLL_NO", // Replace with your actual roll number
    accessCode: "sAWTuR",
    clientID: "3b7fef23-a23e-4726-a0a2-7c1f18e9b03f",
    clientSecret: "PdRHxmyKVPqcAAcy",
    mobileNo: "6392564972",
    githubUsername: "11muskansingh",
  };

  const authManager = new AuthManager(config);

  try {
    // Test authentication
    console.log("Testing authentication...");
    const token = await authManager.authenticate();
    console.log("Authentication successful!");
    console.log("Token:", token.substring(0, 50) + "...");

    // Test token caching
    console.log("\nTesting token caching...");
    const cachedToken = await authManager.authenticate();
    console.log("Cached token matches:", token === cachedToken ? "Yes" : "No");

    // Test registration (optional - only if you need new credentials)
    /*
        console.log('\nTesting registration...');
        const regResult = await authManager.register();
        console.log('Registration result:', regResult);
        */
  } catch (error) {
    console.error("Auth test failed:", error);
  }
}

// Run the tests
console.log("Starting authentication tests...\n");
testAuth();
