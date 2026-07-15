import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Parcel Delivery Management System</h1>
          <p>Fast, Reliable, and Efficient Parcel Delivery Services</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Get Started</Link>
            <Link to="/register" className="btn btn-secondary">Register Now</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Easy Booking</h3>
              <p>Book your parcel delivery in just a few clicks</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Real-time Tracking</h3>
              <p>Track your parcels in real-time from pickup to delivery</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👤</div>
              <h3>Professional Agents</h3>
              <p>Trained and verified delivery professionals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Affordable Pricing</h3>
              <p>Competitive rates for all your delivery needs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Register with your email</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Book Parcel</h3>
            <p>Enter delivery details</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Track Status</h3>
            <p>Monitor in real-time</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Delivery Done</h3>
            <p>Parcel delivered safely</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
