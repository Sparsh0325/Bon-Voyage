import React, { useState } from 'react';
import { X, Star, MapPin, Calendar, Clock, DollarSign, Plus, Check } from 'lucide-react';
import { addActivityToTrip } from '../../api/TripApi';
import './PlaceDetailsModal.css';

const PlaceDetailsModal = ({ item, isOpen, onClose, defaultTripId = 1 }) => {
  const [dayNumber, setDayNumber] = useState(1);
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [cost, setCost] = useState(item?.price?.replace(/[^0-9]/g, '') || "500");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !item) return null;

  const {
    title,
    rating = 4.6,
    reviewsCount = 1240,
    location = "Jaipur, Rajasthan",
    image,
    description,
    tags = ["Sightseeing", "Top Rated"],
    latitude,
    longitude,
    price = "Free Access"
  } = item;

  const handleSaveToItinerary = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const activityData = {
      tripId: defaultTripId,
      dayNumber: Number(dayNumber),
      activityType: item.category === "Hotel" ? "HOTEL" : item.category === "Restaurant" ? "FOOD" : "PLACE",
      activityName: title,
      address: location,
      estimatedCost: parseFloat(cost) || 0.0,
      rating: parseFloat(rating) || 4.5,
      timeSlot: timeSlot,
      notes: notes || `Added from ${location}`
    };

    try {
      const response = await addActivityToTrip(activityData);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1400);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="place-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <X size={20} />
        </button>

        {/* Modal Header Cover Image */}
        <div className="modal-image-header">
          <img src={image} alt={title} className="modal-cover-img" />
          <span className="modal-price-badge">{price}</span>
        </div>

        {/* Modal Body */}
        <div className="modal-body-content">
          <h2 className="modal-place-title">{title}</h2>

          <div className="modal-rating-row">
            <span className="rating-score">{rating}</span>
            <div className="stars-wrapper">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(rating) ? "#FBBC05" : "none"} color="#FBBC05" />
              ))}
            </div>
            <span className="reviews-count">({reviewsCount.toLocaleString()} reviews)</span>
            <span className="bullet-dot">•</span>
            <span className="modal-location">
              <MapPin size={14} className="inline-icon" />
              {location}
            </span>
          </div>

          {latitude && longitude && (
            <div className="modal-coords-tag">
              📍 GPS Coordinates: {latitude.toFixed(4)} N, {longitude.toFixed(4)} E
            </div>
          )}

          <p className="modal-description">{description}</p>

          <div className="modal-tags-row">
            {tags.map((tag, idx) => (
              <span key={idx} className="modal-tag">{tag}</span>
            ))}
          </div>

          <hr className="modal-divider" />

          {/* Add to Itinerary Form */}
          <form className="add-itinerary-form" onSubmit={handleSaveToItinerary}>
            <h4 className="form-section-title">
              <Calendar size={16} />
              Add Activity to Trip Day
            </h4>

            <div className="form-fields-grid">
              <div className="form-field">
                <label>Trip Day</label>
                <select 
                  className="modal-select" 
                  value={dayNumber} 
                  onChange={(e) => setDayNumber(e.target.value)}
                >
                  <option value={1}>Day 1</option>
                  <option value={2}>Day 2</option>
                  <option value={3}>Day 3</option>
                  <option value={4}>Day 4</option>
                </select>
              </div>

              <div className="form-field">
                <label><Clock size={13} /> Time Slot</label>
                <input 
                  type="text" 
                  className="modal-input" 
                  value={timeSlot} 
                  onChange={(e) => setTimeSlot(e.target.value)} 
                  placeholder="e.g. 10:00 AM"
                />
              </div>

              <div className="form-field">
                <label><DollarSign size={13} /> Est. Cost (₹)</label>
                <input 
                  type="number" 
                  className="modal-input" 
                  value={cost} 
                  onChange={(e) => setCost(e.target.value)} 
                  placeholder="500"
                />
              </div>
            </div>

            <div className="form-field full-width">
              <label>Personal Notes (Optional)</label>
              <input 
                type="text" 
                className="modal-input" 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                placeholder="e.g. Visit early morning, buy tickets at entrance..."
              />
            </div>

            <button 
              type="submit" 
              className={`modal-submit-btn ${savedSuccess ? 'success' : ''}`}
              disabled={isSaving}
            >
              {savedSuccess ? (
                <>
                  <Check size={18} />
                  <span>Saved to Itinerary & MySQL!</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>{isSaving ? "Saving to Spring Boot..." : "Save to Trip Itinerary"}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsModal;
