import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Plus, Trash2, Clock, DollarSign, Sparkles, MapPin } from 'lucide-react';
import Map from '../components/Map/Map';
import Loading from '../components/Common/Loading';
import { getTripDetails, deleteActivity } from '../api/TripApi';
import './Itinerary.css';

const Itinerary = () => {
  const [searchParams] = useSearchParams();
  const tripIdParam = searchParams.get('tripId') || '1';

  const [selectedDay, setSelectedDay] = useState(1);
  const [loading, setLoading] = useState(true);
  const [tripData, setTripData] = useState({
    tripId: 1,
    destination: "Jaipur, Rajasthan",
    dates: "Oct 12 - Oct 15, 2025",
    totalBudget: 20000,
    remainingBudget: 14200,
    days: [
      {
        dayNumber: 1,
        date: "Day 1",
        title: "Historical Forts & Palace Exploration",
        activities: [
          { id: 101, title: "Amer Fort Tour", category: "PLACE", time: "09:30 AM", duration: "3 hrs", cost: 500 },
          { id: 102, title: "Lunch at LMB Restaurant", category: "FOOD", time: "01:30 PM", duration: "1.5 hrs", cost: 800 },
          { id: 103, title: "Check-in at Heritage Palace Hotel", category: "HOTEL", time: "03:30 PM", duration: "1 hr", cost: 4500 }
        ]
      },
      {
        dayNumber: 2,
        date: "Day 2",
        title: "Old City Pink City Walk & Markets",
        activities: [
          { id: 201, title: "Hawa Mahal Photo Op", category: "PLACE", time: "10:00 AM", duration: "2 hrs", cost: 200 }
        ]
      }
    ]
  });

  const loadBackendTripData = async () => {
    setLoading(true);
    try {
      const data = await getTripDetails(tripIdParam);
      if (data && data.tripId) {
        // Group activities by day
        const activitiesList = data.activities || [];
        const maxDay = Math.max(1, ...activitiesList.map((a) => a.dayNumber || 1));
        const daysArr = [];

        for (let d = 1; d <= Math.max(3, maxDay); d++) {
          const dayActs = activitiesList
            .filter((a) => (a.dayNumber || 1) === d)
            .map((a) => ({
              id: a.activityId,
              title: a.activityName,
              category: a.activityType || "PLACE",
              time: a.timeSlot || "10:00 AM",
              duration: "2 hrs",
              cost: a.estimatedCost || 0.0
            }));

          daysArr.push({
            dayNumber: d,
            date: `Day ${d}`,
            title: `Day ${d} Activities`,
            activities: dayActs
          });
        }

        setTripData({
          tripId: data.tripId,
          destination: data.destination || "Destination",
          dates: `${data.startDate || '2025-10-12'} to ${data.endDate || '2025-10-15'}`,
          totalBudget: data.totalBudget || 15000,
          remainingBudget: data.remainingBudget || 15000,
          days: daysArr
        });
      }
    } catch (err) {
      console.warn("Using default itinerary state:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBackendTripData();
  }, [tripIdParam]);

  const activeDayData = tripData.days.find((d) => d.dayNumber === selectedDay) || tripData.days[0] || { activities: [] };
  const remainingBudget = tripData.remainingBudget;

  const handleDeleteActivity = async (actId) => {
    // Optimistic UI update
    setTripData((prev) => ({
      ...prev,
      days: prev.days.map((d) => {
        if (d.dayNumber === selectedDay) {
          return {
            ...d,
            activities: d.activities.filter((a) => a.id !== actId)
          };
        }
        return d;
      })
    }));

    try {
      await deleteActivity(actId);
      // Refresh to sync budget recalculation from Spring Boot
      loadBackendTripData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="itinerary-page-container">
      {/* Header Banner */}
      <div className="itinerary-header-card">
        <div className="header-info">
          <div className="destination-badge">
            <Calendar size={16} />
            <span>{tripData.destination} • {tripData.dates}</span>
          </div>
          <h2 className="itinerary-title">Trip Itinerary & Live Budget Sync</h2>
        </div>

        {/* Budget Reconciliation Badge */}
        <div className="budget-reconciliation-card">
          <div className="budget-item">
            <span className="budget-label">Total Allocated</span>
            <span className="budget-value">₹{tripData.totalBudget.toLocaleString()}</span>
          </div>
          <div className="budget-divider" />
          <div className="budget-item">
            <span className="budget-label">Remaining Balance</span>
            <span className={`budget-value ${remainingBudget >= 0 ? 'positive' : 'negative'}`}>
              ₹{remainingBudget.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <Loading message="Syncing itinerary with Spring Boot MySQL..." />
      ) : (
        /* Main Grid: Left Timeline + Right Map */
        <div className="itinerary-grid">
          {/* Left Column Timeline */}
          <div className="itinerary-timeline-col">
            {/* Day Selector Tabs */}
            <div className="day-tabs-row">
              {tripData.days.map((d) => (
                <button
                  key={d.dayNumber}
                  className={`day-tab-btn ${selectedDay === d.dayNumber ? 'active' : ''}`}
                  onClick={() => setSelectedDay(d.dayNumber)}
                >
                  <span>Day {d.dayNumber}</span>
                  <small>{d.date}</small>
                </button>
              ))}

              <button 
                className="add-day-btn" 
                onClick={() => {
                  const nextDayNum = tripData.days.length + 1;
                  setTripData(prev => ({
                    ...prev,
                    days: [...prev.days, { dayNumber: nextDayNum, date: `Day ${nextDayNum}`, title: `Day ${nextDayNum} Schedule`, activities: [] }]
                  }));
                }}
                title="Add Day"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Active Day Header */}
            <div className="active-day-banner">
              <h3>Day {activeDayData.dayNumber}: {activeDayData.title}</h3>
              <button className="ai-optimize-btn">
                <Sparkles size={14} />
                <span>AI Optimize Day</span>
              </button>
            </div>

            {/* Activities Timeline List */}
            <div className="timeline-activities-list">
              {activeDayData.activities && activeDayData.activities.length > 0 ? (
                activeDayData.activities.map((act) => (
                  <div key={act.id} className="timeline-activity-card">
                    <div className="timeline-marker">
                      <div className="marker-dot" />
                      <div className="marker-line" />
                    </div>

                    <div className="activity-card-body">
                      <div className="activity-main-info">
                        <div className="activity-title-row">
                          <span className={`category-tag ${(act.category || 'PLACE').toLowerCase()}`}>
                            {act.category}
                          </span>
                          <h4 className="activity-name">{act.title}</h4>
                        </div>

                        <div className="activity-meta-row">
                          <span className="meta-item">
                            <Clock size={13} />
                            {act.time} ({act.duration})
                          </span>
                          <span className="meta-item cost">
                            <DollarSign size={13} />
                            Est. Cost: ₹{act.cost}
                          </span>
                        </div>
                      </div>

                      <button 
                        className="delete-activity-btn" 
                        onClick={() => handleDeleteActivity(act.id)}
                        title="Remove Activity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '24px 0', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                  No activities scheduled for Day {selectedDay}. Browse places, hotels, or restaurants and click "Add to Itinerary"!
                </div>
              )}
            </div>
          </div>

          {/* Right Column Interactive Map */}
          <div className="itinerary-map-col">
            <Map location={tripData.destination} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
