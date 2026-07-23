import React from 'react';
import { MapPin, Navigation, Layers, Plus, Minus } from 'lucide-react';
import './Map.css';

const Map = ({ location = "Jaipur, Rajasthan", markers = [] }) => {
  return (
    <div className="map-container">
      <div className="map-overlay-badge">
        <MapPin size={15} className="map-badge-icon" />
        <span>{location}</span>
      </div>

      <div className="map-controls">
        <button className="map-ctrl-btn" title="Zoom In"><Plus size={16} /></button>
        <button className="map-ctrl-btn" title="Zoom Out"><Minus size={16} /></button>
        <button className="map-ctrl-btn" title="Layers"><Layers size={16} /></button>
        <button className="map-ctrl-btn" title="Recenter"><Navigation size={16} /></button>
      </div>

      {/* Simulated Dark Mode Map Grid */}
      <div className="map-canvas-mock">
        <div className="map-grid-pattern" />
        <div className="map-marker-pin pin-1" title="Amer Fort">
          <MapPin size={22} fill="#EA4335" color="#ffffff" />
          <span className="pin-label">Amer Fort</span>
        </div>
        <div className="map-marker-pin pin-2" title="Hawa Mahal">
          <MapPin size={22} fill="#4285F4" color="#ffffff" />
          <span className="pin-label">Hawa Mahal</span>
        </div>
        <div className="map-marker-pin pin-3" title="Jal Mahal">
          <MapPin size={22} fill="#34A853" color="#ffffff" />
          <span className="pin-label">Jal Mahal</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
