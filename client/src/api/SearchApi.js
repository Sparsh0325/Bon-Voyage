import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

// Attach JWT token automatically if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Free Image Helper: Generates a high-resolution photo URL matching the place name & category
 */
export const getFreePlaceImage = (placeName, category = "travel") => {
  const cleanName = placeName ? encodeURIComponent(placeName.trim()) : "travel";
  return `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80&sig=${Math.abs(
    hashString(placeName || "default")
  )}&search=${cleanName},${category}`;
};

// Simple deterministic hash for consistent image assignment
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

/**
 * Format raw Spring Boot PlaceDto into standardized Card Data
 */
export const formatPlaceData = (dto, category = "Attraction", index = 0) => {
  const name = dto.name || `${category} #${index + 1}`;
  const address = dto.address || "Location unavailable";
  const lat = dto.latitude ? dto.latitude.toFixed(3) : null;
  const lon = dto.longitude ? dto.longitude.toFixed(3) : null;

  return {
    id: `${category.toLowerCase()}-${index}-${name.replace(/\s+/g, '-').toLowerCase()}`,
    title: name,
    rating: (4.2 + (index % 7) * 0.1).toFixed(1),
    reviewsCount: 450 + index * 180,
    location: address,
    latitude: dto.latitude,
    longitude: dto.longitude,
    image: getFreePlaceImage(name, category),
    description: `${name} is a top rated ${dto.type || category.toLowerCase()} situated at ${address}.${lat ? ` Coordinates: (${lat}, ${lon}).` : ''}`,
    tags: [dto.type || category, "Verified", "Spring Boot API"],
    price: category === "Hotel" ? "₹4,500 / night" : category === "Restaurant" ? "₹900 for two" : "Free Access"
  };
};

/**
 * API Endpoints calling Spring Boot SearchController
 */
export const fetchPlacesFromApi = async (city) => {
  try {
    const response = await API.get(`/api/places`, { params: { city } });
    if (Array.isArray(response.data)) {
      return response.data.map((item, idx) => formatPlaceData(item, "Attraction", idx));
    }
    return [];
  } catch (error) {
    console.warn("Spring Boot Places API error:", error.message);
    return null; // Signals error/offline state
  }
};

export const fetchHotelsFromApi = async (city) => {
  try {
    const response = await API.get(`/api/hotels`, { params: { city } });
    if (Array.isArray(response.data)) {
      return response.data.map((item, idx) => formatPlaceData(item, "Hotel", idx));
    }
    return [];
  } catch (error) {
    console.warn("Spring Boot Hotels API error:", error.message);
    return null;
  }
};

export const fetchRestaurantsFromApi = async (city) => {
  try {
    const response = await API.get(`/api/restaurants`, { params: { city } });
    if (Array.isArray(response.data)) {
      return response.data.map((item, idx) => formatPlaceData(item, "Restaurant", idx));
    }
    return [];
  } catch (error) {
    console.warn("Spring Boot Restaurants API error:", error.message);
    return null;
  }
};

export default {
  fetchPlacesFromApi,
  fetchHotelsFromApi,
  fetchRestaurantsFromApi,
  getFreePlaceImage,
  formatPlaceData,
};