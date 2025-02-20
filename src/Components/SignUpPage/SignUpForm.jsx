import React from 'react'
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
              <p>Sign up and get 30-day free trial</p>
              <form>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit" className="btn-primary">Submit</button>
              </form>
              <div className="social-signup">
                <button className="btn-social apple">Sign up with Apple</button>
                <button className="btn-social google">Sign up with Google</button>
              </div>
              <p className="login-link">Have an account? <a href="/Login">Sign in</a></p>
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