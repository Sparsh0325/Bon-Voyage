import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import SearchBar from '../components/SearchBar/SearchBar';
import PlaceCard from '../components/Cards/PlaceCard';
import Loading from '../components/Common/Loading';
import EmptyState from '../components/Common/EmptyState';
import { fetchPlacesFromApi } from '../api/SearchApi';
import { SearchContext } from '../context/SearchContext';
import './Places.css';

const Places = () => {
  const [searchParams] = useSearchParams();
  const { search, setSearch } = useContext(SearchContext);

  const initialCity = searchParams.get('q') || search || 'goa';
  const [searchTerm, setSearchTerm] = useState(initialCity);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [placesList, setPlacesList] = useState([]);

  const categories = ['All', 'Images', 'Maps', 'Attractions', 'Things to do'];

  // Fallback data when Spring Boot is offline
  const fallbackPlaces = [
    {
      id: "fallback-1",
      title: "Goa Beachfront & Forts",
      rating: 4.5,
      reviewsCount: 12345,
      location: "Goa, India",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
      description: "Goa is a coastal state in India known for beaches, Portuguese heritage, and seafood.",
      tags: ["Beaches", "Heritage", "Water Sports"],
      price: "Explore State"
    },
    {
      id: "fallback-2",
      title: "Baga Beach",
      rating: 4.5,
      reviewsCount: 6755,
      location: "North Goa",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
      description: "Famous beach in North Goa known for water sports, shacks, and vibrant nightlife.",
      tags: ["Beaches", "Water Sports"],
      price: "Free Access"
    }
  ];

  const loadData = async (city) => {
    if (!city) return;
    setLoading(true);

    const apiResults = await fetchPlacesFromApi(city);

    if (apiResults && apiResults.length > 0) {
      setPlacesList(apiResults);
    } else {
      setPlacesList(
        fallbackPlaces.map(p => ({
          ...p,
          location: `${city.charAt(0).toUpperCase() + city.slice(1)}, India`
        }))
      );
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
    <div className="places-page-container">
      <div className="page-header">
        <div className="header-title-wrapper">
          <MapPin size={22} className="header-icon" />
          <h2>Places & Attractions</h2>
        </div>
      </div>

      <div className="places-search-container">
        <SearchBar initialValue={searchTerm} onSearch={handleSearch} size="large" />
      </div>

      <div className="places-tabs-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`places-tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="search-stats-text">
        Showing results for <strong>"{searchTerm}"</strong> ({placesList.length} items found)
      </div>

      {loading ? (
        <Loading message={`Fetching live places in "${searchTerm}" from Spring Boot API...`} />
      ) : placesList.length > 0 ? (
        <div className="places-results-list">
          {placesList.map((place) => (
            <PlaceCard key={place.id} item={place} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No places found" 
          description={`We couldn't find any places matching "${searchTerm}". Try another query.`}
        />
      )}
    </div>
  );
};

export default Places;
