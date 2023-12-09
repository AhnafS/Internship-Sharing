import axios from "axios";
import { CLOUD_FUNCTIONS_ORIGIN } from "./functions-origin";

const apiUrl = `${CLOUD_FUNCTIONS_ORIGIN}`;

export async function signIn({ email, password }) {
  const url = `${apiUrl}/login`;
  const res = await axios.post(url, { email, password });
  return res.data;
}

export async function signUp({ email, password, secureNote }) {
  console.log("It came here api-services");
  const url = `${apiUrl}/register`;
  console.log(url);
  const res = await axios.post(url, {
    email,
    password,
    secureNote,
  });
  console.log(res);
  return res.data;
}

export async function getUserData({ userIdToken, userId }) {
  const url = `${apiUrl}/users/${userId}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  return res.data;
}

export async function getInternships(email) {
  // Check if email is defined
  while (!email) {
    // Wait for a short period before checking again
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed
  }

  const url = `${apiUrl}/get-internships/${email}`;

  try {
    const res = await axios.get(url);
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error fetching internships:", error);
  }
}

export async function addInternship(email, internshipDetails) {
  // Check if email is defined
  while (!email) {
    // Wait for a short period before checking again
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed
  }

  const url = `${apiUrl}/add-internship`;

  try {
    const res = await axios.post(url, {
      email,
      internshipDetails,
    });
    return res.data;
  } catch (error) {
    console.error("Error adding internship:", error);
    // Handle the error accordingly (e.g., throw, return a default value, etc.)
    console.log(error);
  }
}
