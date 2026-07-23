import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Compass, User, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { registerUser } from "../api/AuthApi";
import "./Login.css";

function Register() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: registerData.fullname,
        email: registerData.email,
        password: registerData.password,
        role: "USER"
      };

      const user = await registerUser(payload);
      if (user && user.userId) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        setErrorMsg("Registration failed. Please check your network or try another email.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Error registering user. Please check your backend connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-brand-header">
          <div className="logo-icon-wrapper">
            <Compass size={28} className="brand-logo-icon" />
          </div>
          <h2>Create Account</h2>
          <p>Join Bon Voyage Travel Planner</p>
        </div>

        {errorMsg && (
          <div className="auth-error-banner" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label><User size={14} /> Full Name</label>
            <input
              type="text"
              name="fullname"
              value={registerData.fullname}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label><Mail size={14} /> Email Address</label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label><Lock size={14} /> Password</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
            <span>{isSubmitting ? "Creating Account..." : "Register & Start Planning"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;