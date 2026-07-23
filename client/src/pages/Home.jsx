import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, MapPin, Hotel, Utensils, Calendar, Users } from 'lucide-react';
import SearchBar from '../components/SearchBar/SearchBar';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/places?q=${encodeURIComponent(query)}`);
    }
  };

  const quickPills = [
    { label: 'Chatbot', path: '/chatbot', icon: MessageSquare },
    { label: 'Places', path: '/places', icon: MapPin },
    { label: 'Hotels', path: '/hotels', icon: Hotel },
    { label: 'Restaurants', path: '/restaurants', icon: Utensils },
    { label: 'Itinerary', path: '/itinerary', icon: Calendar },
    { label: 'Group Itinerary Planner', path: '/group-planner', icon: Users },
  ];

  return (
    <div className="home-page-container">
      <div className="home-hero-section">
        {/* Multi-Color Google Styled Logo */}
        <div className="brand-google-title">
          <span className="char-blue">B</span>
          <span className="char-red">o</span>
          <span className="char-yellow">n</span>
          <span className="char-space">&nbsp;</span>
          <span className="char-blue">V</span>
          <span className="char-green">o</span>
          <span className="char-red">y</span>
          <span className="char-yellow">a</span>
          <span className="char-blue">g</span>
          <span className="char-red">e</span>
        </div>

        <p className="home-hero-subtitle">Travel Planner</p>

        {/* Universal Search Bar */}
        <div className="home-search-wrapper">
          <SearchBar size="large" onSearch={handleSearch} />
        </div>

        {/* Quick Navigation Pills */}
        <div className="quick-pills-row">
          {quickPills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <button 
                key={idx} 
                className="quick-pill-btn"
                onClick={() => navigate(pill.path)}
              >
                <Icon size={16} className="pill-icon" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <span>© 2025 Bon Voyage. All rights reserved.</span>
        <span className="footer-bullet">•</span>
        <a href="#privacy">Privacy Policy</a>
        <span className="footer-bullet">•</span>
        <a href="#terms">Terms of Use</a>
      </footer>
    </div>
  );
};

export default Home;