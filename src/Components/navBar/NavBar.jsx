import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    return (
      <nav className="navbar">
        <div className="logo">
          <p><Link to="/">Malingo</Link></p>
          </div>
        <ul className="nav-links">
          <li><Link to="/about" className='links'>About</Link></li>
          <li><Link to="/contact" className='links'>Contact Us</Link></li>
          <li><Link to="/Signup" className="btn">Sign Up</Link></li>
          <li><Link to="/Login" className="btn-outline">Login</Link></li>
        </ul>
      </nav>
    );
  };
  export default NavBar;