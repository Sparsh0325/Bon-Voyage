import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Chatbot from '../pages/Chatbot';
import Places from '../pages/Places';
import Hotels from '../pages/Hotels';
import Restaurants from '../pages/Restaurants';
import Itinerary from '../pages/Itinerary';
import GroupPlanner from '../pages/GroupPlanner';

import ChatHistory from '../pages/ChatHistory';
import Trips from '../pages/Trips';
import SavedPlaces from '../pages/SavedPlaces';
import Booking from '../pages/Booking';

import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Main App Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/places" element={<Places />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/group-planner" element={<GroupPlanner />} />

        <Route path="/chat-history" element={<ChatHistory />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/saved-places" element={<SavedPlaces />} />
        <Route path="/bookings" element={<Booking />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
