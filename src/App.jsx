import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage';
import SignUpForm from './Components/SignUpPage/SignUpForm';
import LoginForm from './Components/LoginPage/LoginForm';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/Signup" element={<SignUpForm/>}/>
        <Route path="/Login" element={<LoginForm/>}/>
        <Route path="/Home" element={<HomePage/>}/>
      </Routes>
    </Router>
  );
}

export default App