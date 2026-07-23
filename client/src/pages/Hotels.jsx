import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Hotel } from 'lucide-react';
import SearchBar from '../components/SearchBar/SearchBar';
import HotelCard from '../components/Cards/HotelCard';
import Loading from '../components/Common/Loading';
import EmptyState from '../components/Common/EmptyState';
import { fetchHotelsFromApi } from '../api/SearchApi';
import { SearchContext } from '../context/SearchContext';
import './Hotels.css';

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const { search, setSearch } = useContext(SearchContext);

  const initialCity = searchParams.get('q') || search || 'goa';
  const [searchTerm, setSearchTerm] = useState(initialCity);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [hotelsList, setHotelsList] = useState([]);

  const categories = ['All', 'Luxury 5-Star', 'Budget', 'Resorts', 'Boutique Hotels'];

  const fallbackHotels = [
    {
      id: "hotel-fallback-1",
      title: "Taj Lake Palace & Spa",
      rating: 4.9,
      reviewsCount: 4210,
      location: "Udaipur / Goa Coast",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      description: "Iconic luxury resort featuring lake views, royal architecture, infinity pool, and fine dining.",
      price: "₹18,500 / night",
      amenities: ["Free Breakfast", "Infinity Pool", "Spa & Wellness"]
    }
  ];

  const loadData = async (city) => {
    if (!city) return;
    setLoading(true);

    const apiResults = await fetchHotelsFromApi(city);

    if (apiResults && apiResults.length > 0) {
      setHotelsList(apiResults);
    } else {
      setHotelsList(fallbackHotels);
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
    <div className="hotels-page-container">
      <div className="page-header">
        <div className="header-title-wrapper">
          <Hotel size={22} className="header-icon" />
          <h2>Hotels & Stays</h2>
        </div>
      </div>

      <div className="hotels-search-container">
        <SearchBar initialValue={searchTerm} onSearch={handleSearch} size="large" />
      </div>

      <div className="hotels-tabs-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`hotels-tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="search-stats-text">
        Hotels matching <strong>"{searchTerm}"</strong> ({hotelsList.length} stays found)
      </div>

      {loading ? (
        <Loading message={`Fetching live hotels in "${searchTerm}" from Spring Boot API...`} />
      ) : hotelsList.length > 0 ? (
        <div className="hotels-results-list">
          {hotelsList.map((hotel) => (
            <HotelCard key={hotel.id} item={hotel} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No hotels found"
          description={`No verified stays found for "${searchTerm}". Try another city.`}
        />
      )}
    </div>
  );
};

export default Hotels;