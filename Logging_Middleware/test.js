import axios from "axios";

const BASE_URL = "http://20.244.56.144/evaluation-service";

async function getAuthToken() {
  const authData = {
    email: "spariharmuskan1106@gmail.com",
    name: "Muskan Singh",
    rollNo: "2201641520111",
    accessCode: "sAWTuR",
    clientID: "3b7fef23-a23e-4726-a0a2-7c1f18e9b03f",
    clientSecret: "PdRHxmyKVPqcAAcy",
  };

  try {
    const response = await axios.post(`${BASE_URL}/auth`, authData);
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Authentication failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Function to send a log
async function sendLog(token) {
  const logData = {
    stack: "backend",
    level: "error",
    package: "handler",
    message: "received string, expected bool",
  };

  try {
    const response = await axios.post(`${BASE_URL}/logs`, logData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Logging failed:", error.response?.data || error.message);
    throw error;
  }
}

// Run the test
async function test() {
  try {
    console.log("Getting authentication token...");
    const token = await getAuthToken();
    console.log("Successfully got authentication token");

    console.log("\nSending test log...");
    const result = await sendLog(token);
    console.log("Log sent successfully:", result);
  } catch (error) {
    console.error("Test failed:", error);
  }
}

test();
