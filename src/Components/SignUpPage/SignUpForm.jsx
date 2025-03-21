import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import FooterComponent from '../navBar/FooterComponent';

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
          <NavBar />
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>
                {message && <div className={`${isSuccess ? 'text-green-500' : 'text-red-500'} text-center mb-4`}>{message}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded-lg" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded-lg" />
                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required className="w-full p-2 border rounded-lg" />
                    <div className="relative">
                        <input type="password" placeholder="Confirm Password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} required className="w-full p-2 border rounded-lg" />
                        {passwordConfirmation && (
                            passwordMatch ? <span className="text-green-500 absolute right-3 top-3">✔</span> : <span className="text-red-500 absolute right-3 top-3">✖</span>
                        )}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Create Account</button>
                </form>
                <div className="flex justify-between mt-4">
                    <button className="bg-black text-white p-2 rounded-lg w-1/2 mr-2">Sign up with Apple</button>
                    <button className="bg-red-500 text-white p-2 rounded-lg w-1/2 ml-2">Sign up with Google</button>
                </div>
                <p className="text-center mt-4">Already have an account? <Link to="/Login" className="text-blue-500">Sign in</Link></p>
            </div>
        </div>
         {/* Footer */}
      <FooterComponent/>
        </div>
        
    );
};

export default SignUpForm;
