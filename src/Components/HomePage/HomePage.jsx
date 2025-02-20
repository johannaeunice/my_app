import React from "react";
import "./HomePage.css"; // Ensure to create a CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Malingo</div>
      <ul className="nav-links">
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/Signup" className="btn">Sign Up</a></li>
        <li><a href="/login" className="btn-outline">Login</a></li>
      </ul>
    </nav>
  );
};

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="hero-section">
        <h1>Welcome to Malingo</h1>
        <p>Find and join activities that match your interests.</p>
        <a href="/signup" className="btn-primary">Get Started</a>
      </div>
    </div>
  );
};

export default HomePage;
