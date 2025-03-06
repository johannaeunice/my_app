import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginForm.css";
import NavBar from "../navBar/NavBar";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("https://rrn24.techchantier.site/malingo/public/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user)); 
        console.log(sessionStorage);
        
        setIsSuccess(true);
        setMessage("Login successful!");
        setTimeout(() => navigate("/Home"), 2000);
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setIsSuccess(false);
      setMessage("A network error occurred. Please check your connection.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="login-page">
        <div className="login-container">
          <div className="form-section">
            <h2>Welcome Back!</h2>
            <p>Login to continue exploring!</p>
            {message && <div className={isSuccess ? "success-popup" : "error-popup"}>{message}</div>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary">Login</button>
            </form>
            <div className="social-login">
              <button className="btn-social apple">Login with Apple</button>
              <button className="btn-social google">Login with Google</button>
            </div>
            <p className="signup-link">
              Don't have an account? <Link to="/Signup">Sign up</Link>
            </p>
          </div>
          <div className="image-section">
            <div className="overlay-content">
              <h3>Welcome to Malingo</h3>
              <p>Reconnect, engage, and explore endless possibilities.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
