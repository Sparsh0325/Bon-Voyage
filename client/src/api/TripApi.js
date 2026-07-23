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
 * Fetch all trips for a user
 */
export const getUserTrips = async (userId = 1) => {
  try {
    const response = await API.get(`/trips/user/${userId}`);
    return response.data;
  } catch (error) {
    console.warn("Spring Boot getUserTrips error:", error.message);
    return null;
  }
};

/**
 * Create a new trip
 */
export const createTrip = async (tripData) => {
  try {
    const response = await API.post(`/trips`, tripData);
    return response.data;
  } catch (error) {
    console.warn("Spring Boot createTrip error:", error.message);
    return null;
  }
};

/**
 * Get single trip with activities
 */
export const getTripDetails = async (tripId) => {
  try {
    const response = await API.get(`/trips/${tripId}`);
    return response.data;
  } catch (error) {
    console.warn("Spring Boot getTripDetails error:", error.message);
    return null;
  }
};

/**
 * Add an Activity (Place, Hotel, Food) to a trip day and auto-recalculate budget
 */
export const addActivityToTrip = async (activityData) => {
  try {
    const response = await API.post(`/activities`, activityData);
    return response.data;
  } catch (error) {
    console.warn("Spring Boot addActivityToTrip error:", error.message);
    return null;
  }
};

/**
 * Delete an Activity from a trip day
 */
export const deleteActivity = async (activityId) => {
  try {
    const response = await API.delete(`/activities/${activityId}`);
    return response.data;
  } catch (error) {
    console.warn("Spring Boot deleteActivity error:", error.message);
    return null;
  }
};

export default {
  getUserTrips,
  createTrip,
  getTripDetails,
  addActivityToTrip,
  deleteActivity,
};
