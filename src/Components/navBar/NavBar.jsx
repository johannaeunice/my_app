import React from 'react'

const NavBar = () => {
    return (
      <nav className="navbar">
        <div className="logo">Malingo</div>
        <ul className="nav-links">
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/Signup" className="btn">Sign Up</a></li>
          <li><a href="/Login" className="btn-outline">Login</a></li>
        </ul>
      </nav>
    );
  };
  export default NavBar;