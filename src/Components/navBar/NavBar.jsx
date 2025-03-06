import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem('token');

    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Remove token from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
      <nav className="navbar">
        <div className="logo">
          <p><Link to="/">Malingo</Link></p>
        </div>
        <ul className="nav-links">
          <li><Link to="/contact" className='links'>Contact Us</Link></li>
          <li><Link to="/about" className='links'>About Us</Link></li>
          {!isAuthenticated ? (
            <>
              <li><Link to="/Signup" className="btn">Sign Up</Link></li>
              <li><Link to="/Login" className="btn-outline">Login</Link></li>
            </>
          ) : (
            <li><button onClick={handleLogout} className="btn-outline">Logout</button></li>
          )}
        </ul>
      </nav>
    );
  };

export default NavBar;