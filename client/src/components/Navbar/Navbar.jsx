import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Moon, Settings, Grid } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button 
          onClick={toggleSidebar} 
          className="icon-btn sidebar-toggle-btn" 
          aria-label="Toggle Sidebar"
          title="Toggle Navigation"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="navbar-right">
        <button className="icon-btn" title="Toggle Dark Theme">
          <Moon size={18} />
        </button>

        <button 
          className="icon-btn" 
          title="Settings"
          onClick={() => navigate('/settings')}
        >
          <Settings size={18} />
        </button>

        <button className="icon-btn" title="Google Apps">
          <Grid size={18} />
        </button>

        <div 
          className="user-avatar" 
          title="Profile" 
          onClick={() => navigate('/profile')}
        >
          <span>S</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
