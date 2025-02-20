import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage'
import SignUpForm from './Components/SignUpPage/SignUpForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Signup" element={<SignUpForm/>}/>
      </Routes>
    </Router>
  );
}

export default App