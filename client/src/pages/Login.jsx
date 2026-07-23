import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Compass, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { loginUser } from "../api/AuthApi";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const user = await loginUser(login);
      if (user && user.userId) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        setErrorMsg("Invalid Email or Password. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Unable to connect to Spring Boot backend server.");
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
          <h2>Bon Voyage</h2>
          <p>Sign in to your Travel Planner</p>
        </div>

        {errorMsg && (
          <div className="auth-error-banner" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label><Mail size={14} /> Email Address</label>
            <input
              type="email"
              name="email"
              value={login.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label><Lock size={14} /> Password</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={isSubmitting}>
            <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;