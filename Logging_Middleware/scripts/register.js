import axios from "axios";

const BASE_URL = "http://20.244.56.144/evaluation-service";

async function register() {
  const registrationData = {
    email: "spariharmuskan1106@gmail.com",
    name: "Muskan Singh",
    mobileNo: "6392564972",
    githubUsername: "11muskansingh",
    rollNo: "2201641520111",
    accessCode: "sAWTuR",
  };

  try {
    const response = await axios.post(`${BASE_URL}/register`, registrationData);
    console.log("Registration successful!");
    console.log("Your credentials:");
    console.log(JSON.stringify(response.data, null, 2));
    console.log(
      "\nSave these credentials - you will need them for the logger!"
    );
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response ? error.response.data : error.message
    );
  }
}

register();
