import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Moon, Globe, DollarSign } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  return (
    <div className="settings-page-container">
      <div className="page-header">
        <div className="header-title-wrapper">
          <SettingsIcon size={22} className="header-icon" />
          <h2>Settings & Preferences</h2>
        </div>
      </div>

      <div className="settings-card">
        {/* Preference Group 1 */}
        <div className="setting-group-item">
          <div className="setting-info">
            <div className="setting-icon-box"><Moon size={18} /></div>
            <div>
              <h4>Dark Theme</h4>
              <p>Toggle sleek ultra dark background across all pages</p>
            </div>
          </div>
          <input type="checkbox" defaultChecked className="toggle-checkbox" />
        </div>

        <div className="setting-group-item">
          <div className="setting-info">
            <div className="setting-icon-box"><Bell size={18} /></div>
            <div>
              <h4>Trip Notifications</h4>
              <p>Receive real-time AI itinerary alerts and budget updates</p>
            </div>
          </div>
          <input type="checkbox" defaultChecked className="toggle-checkbox" />
        </div>

        <div className="setting-group-item">
          <div className="setting-info">
            <div className="setting-icon-box"><DollarSign size={18} /></div>
            <div>
              <h4>Currency Display</h4>
              <p>Select your default currency for price calculation</p>
            </div>
          </div>
          <select className="setting-select">
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        <div className="setting-group-item">
          <div className="setting-info">
            <div className="setting-icon-box"><Globe size={18} /></div>
            <div>
              <h4>Language</h4>
              <p>Select application language</p>
            </div>
          </div>
          <select className="setting-select">
            <option value="EN">English</option>
            <option value="HI">Hindi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
