import React from 'react';
import { Bookmark } from 'lucide-react';
import PlaceCard from '../components/Cards/PlaceCard';
import './SavedPlaces.css';

const SavedPlaces = () => {
  const savedPlaces = [
    {
      id: 1,
      title: "Amer Fort",
      rating: 4.8,
      reviewsCount: 18450,
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
      description: "Majestic hilltop fort featuring Hindu style elements, ornate gates, cobble paths & lake views.",
      tags: ["Heritage", "Fort", "Architecture"],
      price: "₹500 Entry"
    },
    {
      id: 2,
      title: "Hawa Mahal",
      rating: 4.6,
      reviewsCount: 14200,
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
      description: "Iconic Palace of Winds made with red and pink sandstone, featuring 953 intricate windows.",
      tags: ["Iconic", "Palace", "Photography"],
      price: "₹200 Entry"
    }
  ];

  return (
    <div className="saved-places-container">
      <div className="page-header">
        <div className="header-title-wrapper">
          <Bookmark size={22} className="header-icon" />
          <h2>Saved Places</h2>
        </div>
      </div>

      <div className="saved-places-list">
        {savedPlaces.map(place => (
          <PlaceCard key={place.id} item={place} />
        ))}
      </div>
    </div>
  );
};

export default SavedPlaces;
