import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpForm.css';
import NavBar from '../navBar/NavBar';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === passwordConfirmation);
    };

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
        setPasswordMatch(e.target.value === password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordMatch) {
            setMessage('Passwords do not match.');
            setIsSuccess(false);
            return;
        }
        setMessage('');

        const userData = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation
        };

        try {
            const response = await fetch('https://rrn24.techchantier.site/malingo/public/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setMessage('Account created successfully! Redirecting...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setIsSuccess(false);
                setMessage(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setIsSuccess(false);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
       <div>
        <NavBar/>
         <div className="signup-page">
          <div className="signup-container">
            <div className="form-section">
              <h2>Create an account</h2>
              {/* <p>Sign up now and meet people with the same interests!</p> */}
              {message && <div className={isSuccess ? 'success-popup' : 'error-popup'}>{message}</div>}
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                <div className="password-confirm-container">
                  <input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} required />
                  {passwordConfirmation && (passwordMatch ? <span className="password-match">✔</span> : <span className="password-error">Passwords don't match</span>)}
                </div>
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
