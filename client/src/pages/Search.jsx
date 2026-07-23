import { useState } from "react";
import {
  getPlaces,
  getHotels,
  getRestaurants
} from "../api/searchApi";

export default function Search() {

  const [city, setCity] = useState("");

  const [places, setPlaces] = useState([]);

  const [hotels, setHotels] = useState([]);

  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {

    if (!city.trim()) return;

    setLoading(true);

    try {

      const [placeRes, hotelRes, restaurantRes] = await Promise.all([
        getPlaces(city),
        getHotels(city),
        getRestaurants(city)
      ]);

      setPlaces(placeRes.data);
      setHotels(hotelRes.data);
      setRestaurants(restaurantRes.data);

    } catch (error) {
      console.error(error);
      alert("Failed to fetch travel data.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "30px" }}>

      <h2>Travel Search</h2>

      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {loading && <h3>Loading...</h3>}

      <h2>Places</h2>

      {places.map((place, index) => (
        <div key={index}>
          {place.name}
        </div>
      ))}

      <h2>Hotels</h2>

      {hotels.map((hotel, index) => (
        <div key={index}>
          {hotel.name}
        </div>
      ))}

      <h2>Restaurants</h2>

      {restaurants.map((restaurant, index) => (
        <div key={index}>
          {restaurant.name}
        </div>
      ))}

    </div>
  );
}