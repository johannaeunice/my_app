import React from 'react'
import { Link } from 'react-router-dom';
import './SignUpForm.css'
import NavBar from '../navBar/NavBar';

const SignUpForm = () => {
    
    return (
       <div>
        <NavBar/>
         <div className="signup-page">
          <div className="signup-container">
            <div className="form-section">
              <h2>Create an account</h2>
              <p>Sign up now and meet people with the same interests !</p>
              <form>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit" className="btn-primary">Create Account</button>
              </form>
              <div className="social-signup">
                <button className="btn-social apple">Sign up with Apple</button>
                <button className="btn-social google">Sign up with Google</button>
              </div>
              <p className="login-link">Already have an account? <Link to="/Login">Sign in</Link></p>
            </div>
            <div className="image-section">
              <div className="overlay-content">
                <h3>Join Malingo</h3>
                <p>Connect with others, grow your network, and discover new opportunities.</p>
              </div>
            </div>
          </div>
        </div>
       </div>
      );
}

export default SignUpForm;