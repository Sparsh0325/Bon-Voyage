import React, { useState } from 'react';
import { Star, MapPin, Bookmark, Plus, ExternalLink } from 'lucide-react';
import PlaceDetailsModal from './PlaceDetailsModal';
import './Card.css';

const PlaceCard = ({ item, onBookmark }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    title,
    rating = 4.6,
    reviewsCount = 12450,
    location = "Jaipur, Rajasthan",
    image,
    description,
    tags = ["Heritage", "Architecture", "Culture"],
    price = "Free Entry / ₹500"
  } = item || {};

  return (
    <>
      <div className="search-result-card">
        <div className="card-image-wrapper" onClick={() => setIsModalOpen(true)}>
          <img 
            src={image || "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"} 
            alt={title} 
            className="card-thumbnail"
            loading="lazy"
          />
          <button 
            className="card-bookmark-btn" 
            onClick={(e) => {
              e.stopPropagation();
              if (onBookmark) onBookmark(item);
            }}
            title="Save Place"
          >
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
                <Star 
                  key={i} 
                  size={14} 
                  fill={i < Math.floor(rating) ? "#FBBC05" : "none"} 
                  color="#FBBC05" 
                />
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
            {tags.map((tag, idx) => (
              <span key={idx} className="card-tag">{tag}</span>
            ))}
          </div>

          <div className="card-actions-row">
            <button className="action-btn secondary-btn" onClick={() => setIsModalOpen(true)}>
              <span>View Details</span>
              <ExternalLink size={14} />
            </button>
            <button className="action-btn primary-btn" onClick={() => setIsModalOpen(true)}>
              <Plus size={15} />
              <span>Add to Itinerary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Place Details & Save to Trip Modal */}
      <PlaceDetailsModal 
        item={item} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default PlaceCard;
