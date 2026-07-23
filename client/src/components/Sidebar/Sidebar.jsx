import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  MapPin, 
  Hotel, 
  Utensils, 
  Calendar, 
  Users, 
  History, 
  Briefcase, 
  Bookmark, 
  Ticket, 
  User, 
  Settings, 
  LogOut, 
  Compass,
  ArrowRight
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session if any and redirect to login
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/chatbot', label: 'Chatbot', icon: MessageSquare },
    { path: '/places', label: 'Places', icon: MapPin },
    { path: '/hotels', label: 'Hotels', icon: Hotel },
    { path: '/restaurants', label: 'Restaurants', icon: Utensils },
    { path: '/itinerary', label: 'Itinerary', icon: Calendar },
    { path: '/group-planner', label: 'Group Itinerary Planner', icon: Users },
  ];

  const mySpaceItems = [
    { path: '/chat-history', label: 'Chat History', icon: History },
    { path: '/trips', label: 'My Trips', icon: Briefcase },
    { path: '/saved-places', label: 'Saved Places', icon: Bookmark },
    { path: '/bookings', label: 'Bookings', icon: Ticket },
  ];

  const accountItems = [
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="logo-icon-wrapper">
          <Compass className="brand-logo-icon" size={24} />
        </div>
        {isOpen && (
          <div className="brand-text">
            <span className="brand-name">Bon Voyage</span>
            <span className="brand-subtitle">Travel Planner</span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div className="sidebar-content">
        <nav className="sidebar-section">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                <Icon size={18} className="link-icon" />
                {isOpen && <span className="link-label">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* My Space Section */}
        <div className="sidebar-divider" />
        <div className="section-title">{isOpen && 'MY SPACE'}</div>
        <nav className="sidebar-section">
          {mySpaceItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                <Icon size={18} className="link-icon" />
                {isOpen && <span className="link-label">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Account Section */}
        <div className="sidebar-divider" />
        <div className="section-title">{isOpen && 'ACCOUNT'}</div>
        <nav className="sidebar-section">
          {accountItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                <Icon size={18} className="link-icon" />
                {isOpen && <span className="link-label">{item.label}</span>}
              </NavLink>
            );
          })}
          <button onClick={handleLogout} className="sidebar-link logout-btn" title="Logout">
            <LogOut size={18} className="link-icon" />
            {isOpen && <span className="link-label">Logout</span>}
          </button>
        </nav>

        {/* Promo Card Banner at Bottom */}
        {isOpen && (
          <div className="sidebar-promo-card">
            <div className="promo-bg-illustration" />
            <div className="promo-content">
              <h4>Explore more.</h4>
              <p>Plan better. Travel smarter.</p>
              <button onClick={() => navigate('/itinerary')} className="promo-action-btn">
                <span>Start Planning</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
