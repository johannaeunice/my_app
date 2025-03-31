import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import { motion } from 'framer-motion';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === passwordConfirmation);
    };

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
        setPasswordMatch(e.target.value === password);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
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
                setMessage(data.message || 'Account creation failed. Please try again.');
            }
        } catch (error) {
            setIsSuccess(false);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-orange-50">
            <NavBar />
            <div className="min-h-screen flex justify-center items-center px-4 py-16">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    {/* Left side: Form */}
                    <motion.div 
                        className="w-full md:w-1/2 p-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-[#333333] mb-2">Create an account</h1>
                            <p className="text-gray-500">Fill the form to create your account.</p>
                        </div>
                        
                        {message && (
                            <motion.div 
                                className={`${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} p-4 rounded-lg mb-6`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {message}
                            </motion.div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Full name</label>
                                <motion.input 
                                    whileFocus={{ scale: 1.01 }}
                                    type="text" 
                                    placeholder="Enter your full name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007CC3] focus:border-transparent" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Email</label>
                                <motion.input 
                                    whileFocus={{ scale: 1.01 }}
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007CC3] focus:border-transparent" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Password</label>
                                <div className="relative">
                                    <motion.input 
                                        whileFocus={{ scale: 1.01 }}
                                        type={passwordVisible ? "text" : "password"} 
                                        placeholder="Create a password" 
                                        value={password} 
                                        onChange={handlePasswordChange} 
                                        required 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007CC3] focus:border-transparent" 
                                    />
                                    <button 
                                        type="button" 
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-3 text-gray-400"
                                    >
                                        {passwordVisible ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <motion.input 
                                        whileFocus={{ scale: 1.01 }}
                                        type={passwordVisible ? "text" : "password"} 
                                        placeholder="Confirm your password" 
                                        value={passwordConfirmation} 
                                        onChange={handlePasswordConfirmationChange} 
                                        required 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007CC3] focus:border-transparent" 
                                    />
                                    {passwordConfirmation && (
                                        <motion.span 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className={`absolute right-3 top-3 ${passwordMatch ? 'text-green-500' : 'text-red-500'}`}
                                        >
                                            {passwordMatch ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg> : 
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            }
                                        </motion.span>
                                    )}
                                </div>
                            </div>
                            
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit" 
                                className="w-full bg-[#007CC3] text-white p-3 rounded-lg hover:bg-[#006ba7] transition-all duration-300"
                            >
                                Submit
                            </motion.button>
                        </form>
                        
                        <div className="mt-6">
                            <p className="text-center text-sm text-gray-500 mb-4">Or sign up with</p>
                            <div className="grid grid-cols-2 gap-4">
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                                        <path d="M10 2c1 .5 2 2 2 5"></path>
                                    </svg>
                                    <span className="ml-2">Apple</span>
                                </motion.button>
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#DB4437" stroke="none">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#0F9D58" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span className="ml-2">Google</span>
                                </motion.button>
                            </div>
                        </div>
                        
                        <p className="text-center mt-6 text-gray-600">
                            Already have an account? <Link to="/login" className="text-[#007CC3] hover:underline">Sign in</Link>
                        </p>
                    </motion.div>
                    
                    {/* Right side: Image */}
                    <motion.div 
                        className="hidden md:block w-1/2 bg-gradient-to-r from-[#007CC3] to-[#0099E5] p-8 relative overflow-hidden"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
                        
                        <div className="h-full flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h2 className="text-3xl font-bold text-white mb-6">Join Malingo Today</h2>
                                <p className="text-white text-lg mb-8">
                                    Connect with people who share your interests and enjoy activities together!
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="9" cy="7" r="4"></circle>
                                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                            </svg>
                                        </div>
                                        <p className="text-white">Find travel companions</p>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                                                <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                                                <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                                                <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                                            </svg>
                                        </div>
                                        <p className="text-white">Join outdoor activities</p>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m3 11 18-5v12L3 14v-3z"></path>
                                                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
                                            </svg>
                                        </div>
                                        <p className="text-white">Create your own activities</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            {/* Footer */}
            <div className="py-6 text-center text-gray-500 text-sm">
                <p>&copy; 2025 Malingo. All rights reserved.</p>
            </div>
        </div>
    );
};

export default SignUpForm;