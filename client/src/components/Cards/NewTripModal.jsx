import React, { useState } from 'react';
import { X, Calendar, MapPin, DollarSign, Plus, Check } from 'lucide-react';
import { createTrip } from '../../api/TripApi';
import './PlaceDetailsModal.css';

const NewTripModal = ({ isOpen, onClose, onTripCreated }) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('15000');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destination.trim() || !startDate || !endDate) return;

    setIsSaving(true);
    const newTripPayload = {
      userId: 1,
      destination: destination.trim(),
      startDate: startDate,
      endDate: endDate,
      totalBudget: parseFloat(budget) || 15000.0,
      remainingBudget: parseFloat(budget) || 15000.0,
      status: "PLANNED"
    };

    try {
      const created = await createTrip(newTripPayload);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        if (onTripCreated) onTripCreated(created);
        onClose();
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="place-modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Close">
          <X size={20} />
        </button>

        <div className="modal-body-content" style={{ paddingTop: '28px' }}>
          <h2 className="modal-place-title">Plan a New Trip</h2>
          <p className="modal-description">Set up your trip destination, dates, and budget for Spring Boot itinerary planning.</p>

          <form onSubmit={handleSubmit} className="add-itinerary-form">
            <div className="form-field full-width">
              <label><MapPin size={13} /> Destination City</label>
              <input
                type="text"
                className="modal-input"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Jaipur, Rajasthan or Goa Coast"
                required
              />
            </div>

            <div className="form-fields-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="form-field">
                <label><Calendar size={13} /> Start Date</label>
                <input
                  type="date"
                  className="modal-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label><Calendar size={13} /> End Date</label>
                <input
                  type="date"
                  className="modal-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-field full-width">
              <label><DollarSign size={13} /> Total Allocated Budget (₹)</label>
              <input
                type="number"
                className="modal-input"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="15000"
                required
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
                  <span>Trip Created in MySQL!</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>{isSaving ? "Creating Trip in Spring Boot..." : "Create Trip"}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTripModal;
