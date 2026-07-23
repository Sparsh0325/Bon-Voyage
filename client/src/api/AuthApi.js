import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * User Login
 */
export const loginUser = async (loginCredentials) => {
  try {
    const response = await API.post(`/login`, loginCredentials);
    return response.data;
  } catch (error) {
    console.warn("Spring Boot loginUser error:", error.message);
    return null;
  }
};

/**
 * User Registration
 */
export const registerUser = async (registerData) => {
  try {
    const response = await API.post(`/register`, registerData);
    return response.data;
  } catch (error) {
    console.warn("Spring Boot registerUser error:", error.message);
    return null;
  }
};

/**
 * Get User Profile
 */
export const getUserProfile = async (userId = 1) => {
  try {
    const response = await API.get(`/users/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.warn("Spring Boot getUserProfile error:", error.message);
    return null;
  }
};

/**
 * Update User Profile
 */
export const updateUserProfile = async (userId = 1, profileData) => {
  try {
    const response = await API.put(`/users/profile/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.warn("Spring Boot updateUserProfile error:", error.message);
    return null;
  }
};

export default {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
};
