import React from 'react';
import './Common.css';

const Loading = ({ message = "Loading recommendations..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default Loading;
