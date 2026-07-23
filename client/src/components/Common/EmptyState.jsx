import React from 'react';
import { Compass } from 'lucide-react';
import './Common.css';

const EmptyState = ({ 
  title = "No results found", 
  description = "Try searching for a different destination or adjusting your filters.",
  actionText,
  onAction 
}) => {
  return (
    <div className="empty-state-container">
      <div className="empty-icon-wrapper">
        <Compass size={40} className="empty-icon" />
      </div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{description}</p>
      {actionText && (
        <button className="empty-action-btn" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
