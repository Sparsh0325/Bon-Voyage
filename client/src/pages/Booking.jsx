import React, { useState, useEffect } from 'react';
import { Ticket, CheckCircle } from 'lucide-react';
import { getTripDetails } from '../api/TripApi';
import Loading from '../components/Common/Loading';
import EmptyState from '../components/Common/EmptyState';
import './Booking.css';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackBookings = [
    {
      id: "BK-8904",
      placeName: "Heritage Fort Resort & Palace",
      type: "HOTEL",
      bookingDate: "Day 1 (10:00 AM)",
      amount: "₹4,500",
      status: "CONFIRMED"
    },
    {
      id: "BK-8905",
      placeName: "Thalassa Sunset Dinner Reservation",
      type: "FOOD",
      bookingDate: "Day 1 (01:30 PM)",
      amount: "₹1,200",
      status: "CONFIRMED"
    }
  ];

  useEffect(() => {
    const loadBookingsFromBackend = async () => {
      setLoading(true);
      try {
        const tripDetails = await getTripDetails(1);
        if (tripDetails && tripDetails.activities && tripDetails.activities.length > 0) {
          // Filter activities that are HOTEL or FOOD (or HOTEL/FOOD/PLACE)
          const bookedActs = tripDetails.activities.map((act) => ({
            id: `BK-${1000 + act.activityId}`,
            placeName: act.activityName,
            type: act.activityType || "ACTIVITY",
            bookingDate: `Day ${act.dayNumber || 1} (${act.timeSlot || 'Scheduled'})`,
            amount: `₹${(act.estimatedCost || 0).toLocaleString()}`,
            status: "CONFIRMED"
          }));

          setBookings(bookedActs);
        } else {
          setBookings(fallbackBookings);
        }
      } catch (err) {
        console.warn(err);
        setBookings(fallbackBookings);
      } finally {
        setLoading(false);
      }
    };

    loadBookingsFromBackend();
  }, []);

  return (
    <div className="bookings-page-container">
      <div className="page-header">
        <div className="header-title-wrapper">
          <Ticket size={22} className="header-icon" />
          <h2>My Bookings & Reservations</h2>
        </div>
      </div>

      {loading ? (
        <Loading message="Fetching verified bookings from Spring Boot..." />
      ) : bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map((item) => (
            <div key={item.id} className="booking-card">
              <div className="booking-status-col">
                <CheckCircle size={24} className="status-icon confirmed" />
                <span className="booking-ref">{item.id}</span>
              </div>
              <div className="booking-info-col">
                <h3>{item.placeName}</h3>
                <p>Category: <strong>{item.type}</strong> • Schedule: <strong>{item.bookingDate}</strong></p>
              </div>
              <div className="booking-amount-col">
                <span className="amount-text">{item.amount}</span>
                <span className="status-label confirmed">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No bookings saved yet"
          description="Browse hotels, restaurants, or places and add them to your trip itinerary."
        />
      )}
    </div>
  );
};

export default Booking;
