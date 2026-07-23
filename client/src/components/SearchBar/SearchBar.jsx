import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, X, MapPin, TrendingUp, History } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ 
  placeholder = "Search for places, hotels, restaurants, or ask anything...", 
  initialValue = "", 
  onSearch,
  size = "medium" // 'large' for Home, 'medium' for header/pages
}) => {
  const [query, setQuery] = useState(initialValue);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Popular destination suggestions dataset
  const destinationSuggestions = [
    { name: "Jaipur, Rajasthan", type: "Popular City", subtext: "Forts, Palaces & Rajasthani Food" },
    { name: "Goa Coast", type: "Popular Beach State", subtext: "Beaches, Nightlife & Shacks" },
    { name: "Manali, Himachal Pradesh", type: "Hill Station", subtext: "Snow, Solang Valley & Mountains" },
    { name: "Udaipur, Rajasthan", type: "City of Lakes", subtext: "Lake Palace, Pichola Lake & Resorts" },
    { name: "Mumbai, Maharashtra", type: "Metropolis", subtext: "Gateway of India, Marine Drive & Seafood" },
    { name: "Jaisalmer, Rajasthan", type: "Desert Safari", subtext: "Golden Fort & Sam Sand Dunes" },
    { name: "Delhi", type: "Capital City", subtext: "Red Fort, Qutub Minar & Chandi Chowk" },
    { name: "Kerala Backwaters", type: "Nature", subtext: "Alleppey Houseboats & Munnar Tea Gardens" }
  ];

  // Filter suggestions based on typed user query
  const filteredSuggestions = query.trim()
    ? destinationSuggestions.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.subtext.toLowerCase().includes(query.toLowerCase())
      )
    : destinationSuggestions.slice(0, 5); // Show top 5 default suggestions when focused

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      setShowDropdown(false);
      onSearch(query.trim());
    }
  };

  const handleSelectSuggestion = (suggestionName) => {
    setQuery(suggestionName);
    setShowDropdown(false);
    if (onSearch) {
      onSearch(suggestionName);
    }
  };

  const handleClear = () => {
    setQuery("");
    setShowDropdown(false);
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className={`search-bar-container ${size}`} ref={dropdownRef}>
      <form className={`search-bar-form ${size}`} onSubmit={handleSubmit}>
        <div className={`search-input-wrapper ${showDropdown ? 'has-dropdown' : ''}`}>
          <Search size={20} className="search-icon" />
          
          <input
            type="text"
            className="search-input"
            value={query}
            onFocus={() => setShowDropdown(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            placeholder={placeholder}
          />

          {query && (
            <button type="button" className="clear-btn" onClick={handleClear} title="Clear">
              <X size={18} />
            </button>
          )}

          <button type="button" className="action-icon-btn mic-btn" title="Search by Voice">
            <Mic size={19} />
          </button>

          {/* Google Lens / AI Camera Icon */}
          <button type="button" className="action-icon-btn lens-btn" title="Search with AI Lens">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 7H16L14 4H10L8 7H5C3.89543 7 3 7.89543 3 9V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7Z" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="18" cy="10" r="1" fill="#FBBC05"/>
            </svg>
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {showDropdown && filteredSuggestions.length > 0 && (
        <div className="autocomplete-dropdown-card">
          <div className="dropdown-header">
            {query.trim() ? <TrendingUp size={14} /> : <History size={14} />}
            <span>{query.trim() ? "Matching Destinations" : "Trending Destinations"}</span>
          </div>

          <div className="suggestions-list">
            {filteredSuggestions.map((item, idx) => (
              <div 
                key={idx} 
                className="suggestion-item" 
                onClick={() => handleSelectSuggestion(item.name)}
              >
                <MapPin size={16} className="suggestion-icon" />
                <div className="suggestion-text-box">
                  <div className="suggestion-title-row">
                    <span className="suggestion-name">{item.name}</span>
                    <span className="suggestion-type-badge">{item.type}</span>
                  </div>
                  <span className="suggestion-subtext">{item.subtext}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
