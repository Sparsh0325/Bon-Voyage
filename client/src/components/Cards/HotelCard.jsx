import React, { useState } from 'react';
import { Star, MapPin, Bookmark, ExternalLink, Ticket } from 'lucide-react';
import PlaceDetailsModal from './PlaceDetailsModal';
import './Card.css';

const HotelCard = ({ item, onBookmark }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    title,
    rating = 4.7,
    reviewsCount = 3820,
    location = "Central Jaipur",
    image,
    description,
    price = "₹4,500 / night",
    amenities = ["Free WiFi", "Breakfast", "Pool", "AC"]
  } = item || {};

  return (
    <>
      <div className="search-result-card">
        <div className="card-image-wrapper" onClick={() => setIsModalOpen(true)}>
          <img 
            src={image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"} 
            alt={title} 
            className="card-thumbnail"
            loading="lazy"
          />
          <button className="card-bookmark-btn" title="Save Hotel" onClick={(e) => { e.stopPropagation(); onBookmark && onBookmark(item); }}>
            <Bookmark size={16} />
          </button>
        </div>

        <div className="card-details">
          <div className="card-header-row">
            <h3 className="card-title" onClick={() => setIsModalOpen(true)}>{title}</h3>
            <span className="card-price-badge">{price}</span>
          </div>

          <div className="card-rating-row">
            <span className="rating-score">{rating}</span>
            <div className="stars-wrapper">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(rating) ? "#FBBC05" : "none"} color="#FBBC05" />
              ))}
            </div>
            <span className="reviews-count">({reviewsCount.toLocaleString()})</span>
            <span className="bullet-dot">•</span>
            <span className="card-location">
              <MapPin size={13} className="inline-icon" />
              {location}
            </span>
          </div>

          <p className="card-snippet">{description}</p>

          <div className="card-tags-row">
            {amenities.map((amenity, idx) => (
              <span key={idx} className="card-tag">{amenity}</span>
            ))}
          </div>

          <div className="card-actions-row">
            <button className="action-btn secondary-btn" onClick={() => setIsModalOpen(true)}>
              <span>View Details</span>
              <ExternalLink size={14} />
            </button>
            <button className="action-btn primary-btn" onClick={() => setIsModalOpen(true)}>
              <Ticket size={15} />
              <span>Book / Add to Trip</span>
            </button>
          </div>
        </div>
      </div>

      <PlaceDetailsModal 
        item={{ ...item, category: 'Hotel' }} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default HotelCard;
