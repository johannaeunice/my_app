import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"; // Ensure to create a CSS file for styling
import NavBar from "../navBar/NavBar";

function LandingPage(){
  return (
    <div className="LandingPage">
      <NavBar />
      <div className="hero-section">
        <h1>Welcome to Malingo</h1>
        <p>Find and join activities that match your interests.</p>
        <Link to="/Signup" className="btn-primary">Get Started</Link>
      </div>
    </div>
  );
};

export default LandingPage;
