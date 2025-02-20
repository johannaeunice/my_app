import React from "react";
import "./LoginForm.css"; // Assure-toi de créer un fichier CSS dédié
import NavBar from "../navBar/NavBar";

const LoginForm = () => {
  return (
   <div>
    <NavBar/>
     <div className="login-page">
      <div className="login-container">
        <div className="form-section">
          <h2>Welcome Back!</h2>
          <p>Login to continue</p>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <a href="/Home"><button type="submit" className="btn-primary">Login</button></a>
          </form>
          <div className="social-login">
            <button className="btn-social apple">Login with Apple</button>
            <button className="btn-social google">Login with Google</button>
          </div>
          <p className="signup-link">Don't have an account? <a href="/Signup">Sign up</a></p>
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
