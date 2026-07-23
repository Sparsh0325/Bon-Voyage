import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Utensils } from 'lucide-react';
import SearchBar from '../components/SearchBar/SearchBar';
import RestaurantCard from '../components/Cards/RestaurantCard';
import Loading from '../components/Common/Loading';
import EmptyState from '../components/Common/EmptyState';
import { fetchRestaurantsFromApi } from '../api/SearchApi';
import { SearchContext } from '../context/SearchContext';
import './Restaurants.css';

const Restaurants = () => {
  const [searchParams] = useSearchParams();
  const { search, setSearch } = useContext(SearchContext);

  const initialCity = searchParams.get('q') || search || 'goa';
  const [searchTerm, setSearchTerm] = useState(initialCity);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [restaurantsList, setRestaurantsList] = useState([]);

  const categories = ['All', 'Authentic Thali', 'Beachside Shacks', 'Fine Dining', 'Cafes & Bakery'];

  const fallbackRestaurants = [
    {
      id: "rest-fallback-1",
      title: "LMB (Laxmi Misthan Bhandar)",
      rating: 4.8,
      reviewsCount: 6120,
      location: "Johari Bazaar, Jaipur",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      description: "Famous legendary restaurant known for authentic Royal Rajasthani Thali and traditional sweets.",
      price: "₹900 for two",
      cuisine: ["Rajasthani Thali", "Sweets"]
    }
  ];

  const loadData = async (city) => {
    if (!city) return;
    setLoading(true);

    const apiResults = await fetchRestaurantsFromApi(city);

    if (apiResults && apiResults.length > 0) {
      setRestaurantsList(apiResults);
    } else {
      setRestaurantsList(fallbackRestaurants);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData(searchTerm);
  }, [searchTerm]);

  const handleSearch = (query) => {
    if (query.trim()) {
      setSearchTerm(query.trim());
      if (setSearch) setSearch(query.trim());
    }
  };

  return (
    <div className="restaurants-page-container">
      <div className="page-header">
        <div className="header-title-wrapper">
          <Utensils size={22} className="header-icon" />
          <h2>Restaurants & Dining</h2>
        </div>
      </div>

      <div className="restaurants-search-container">
        <SearchBar initialValue={searchTerm} onSearch={handleSearch} size="large" />
      </div>

      <div className="restaurants-tabs-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`restaurants-tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="search-stats-text">
        Dining places in <strong>"{searchTerm}"</strong> ({restaurantsList.length} spots found)
      </div>

      {loading ? (
        <Loading message={`Fetching live restaurants in "${searchTerm}" from Spring Boot API...`} />
      ) : restaurantsList.length > 0 ? (
        <div className="restaurants-results-list">
          {restaurantsList.map((restaurant) => (
            <RestaurantCard key={restaurant.id} item={restaurant} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No restaurants found"
          description={`No dining places found for "${searchTerm}". Try another query.`}
        />
      )}
    </div>
  );
};

export default Restaurants;