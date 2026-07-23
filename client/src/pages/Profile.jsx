import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Check, Lock } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../api/AuthApi';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: "Sam Travel Explorer",
    email: "sam@example.com",
    phone: "+91 98765 43210",
    homeLocation: "Mumbai, India",
    password: "••••••••"
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setProfile((prev) => ({
            ...prev,
            fullName: parsed.fullName || parsed.email?.split('@')[0] || prev.fullName,
            email: parsed.email || prev.email
          }));
        } catch (e) {
          console.warn(e);
        }
      }

      const apiData = await getUserProfile(1);
      if (apiData) {
        setProfile((prev) => ({
          ...prev,
          fullName: apiData.fullName || prev.fullName,
          phone: apiData.phone || prev.phone,
          profileImage: apiData.profileImage || prev.profileImage
        }));
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateUserProfile(1, profile);
      // Update local storage representation
      localStorage.setItem("user", JSON.stringify({ ...profile }));

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-page-container">
      <div className="page-header">
        <div className="header-title-wrapper">
          <User size={22} className="header-icon" />
          <h2>User Profile & Security</h2>
        </div>
      </div>

      <div className="profile-card">
        {/* Avatar Section */}
        <div className="profile-avatar-row">
          <div className="avatar-large">
            <span>{profile.fullName?.charAt(0)?.toUpperCase() || 'S'}</span>
            <button className="avatar-edit-badge" title="Change Avatar Image">
              <Camera size={14} />
            </button>
          </div>
          <div className="avatar-details">
            <h3>{profile.fullName}</h3>
            <p>Member since Oct 2025 • Verified Traveler</p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          <div className="profile-form-grid">
            <div className="form-group">
              <label><User size={14} /> Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label><Mail size={14} /> Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label><Phone size={14} /> Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label><MapPin size={14} /> Home Location</label>
              <input
                type="text"
                name="homeLocation"
                value={profile.homeLocation}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label><Lock size={14} /> Change Security Password</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Leave as •••••••• to keep current password"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`save-profile-btn ${saveSuccess ? 'success' : ''}`}
            disabled={isSaving}
          >
            {saveSuccess ? (
              <>
                <Check size={16} />
                <span>Profile Updated in MySQL!</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
