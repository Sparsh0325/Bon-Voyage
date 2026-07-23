import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserTrips } from '../api/TripApi';
import NewTripModal from '../components/Cards/NewTripModal';
import Loading from '../components/Common/Loading';
import EmptyState from '../components/Common/EmptyState';
import './Trips.css';

const Trips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fallbackTrips = [
    {
      tripId: 1,
      destination: "Jaipur, Rajasthan",
      startDate: "2025-10-12",
      endDate: "2025-10-15",
      status: "PLANNED",
      totalBudget: 20000,
      remainingBudget: 14200,
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
    },
    {
      tripId: 2,
      destination: "Goa Coast",
      startDate: "2025-11-20",
      endDate: "2025-11-25",
      status: "PLANNED",
      totalBudget: 35000,
      remainingBudget: 28500,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const loadUserTrips = async () => {
    setLoading(true);
    const data = await getUserTrips(1);

    if (data && Array.isArray(data) && data.length > 0) {
      const mapped = data.map((t, idx) => ({
        ...t,
        image: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80&sig=${idx}&search=${encodeURIComponent(t.destination)}`
      }));
      setTrips(mapped);
    } else {
      setTrips(fallbackTrips);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUserTrips();
  }, []);

  const handleTripCreated = (newTrip) => {
    loadUserTrips();
  };

  return (
    <div className="trips-page-container">
      <div className="trips-header">
        <div className="header-title-wrapper">
          <Briefcase size={22} className="header-icon" />
          <h2>My Trips</h2>
        </div>
        <button className="create-trip-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          <span>Plan New Trip</span>
        </button>
      </div>

      {loading ? (
        <Loading message="Fetching your trips from Spring Boot MySQL..." />
      ) : trips.length > 0 ? (
        <div className="trips-grid">
          {trips.map((trip) => (
            <div 
              key={trip.tripId} 
              className="trip-card" 
              onClick={() => navigate(`/itinerary?tripId=${trip.tripId}`)}
            >
              <div className="trip-image-box">
                <img src={trip.image} alt={trip.destination} />
                <span className={`status-pill ${trip.status.toLowerCase()}`}>{trip.status}</span>
              </div>
              <div className="trip-card-body">
                <h3>{trip.destination}</h3>
                <p className="trip-dates">
                  <Calendar size={14} />
                  {trip.startDate} to {trip.endDate}
                </p>

                <div className="trip-footer-meta">
                  <span className="budget-tag">
                    Total: ₹{trip.totalBudget?.toLocaleString() || '0'}
                  </span>
                  <span className="activities-tag" style={{ color: '#34d399', fontWeight: 600 }}>
                    Rem: ₹{trip.remainingBudget?.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No trips saved yet"
          description="Create your first trip destination and start organizing activities!"
          actionText="Plan First Trip"
          onAction={() => setIsModalOpen(true)}
        />
      )}

      {/* New Trip Creation Modal */}
      <NewTripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTripCreated={handleTripCreated}
      />
    </div>
  );
};

export default Trips;
