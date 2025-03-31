import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage';
import SignUpForm from './Components/SignUpPage/SignUpForm';
import LoginForm from './Components/LoginPage/LoginForm';
import HomePage from './Components/HomePage/HomePage';
import CreateActivityPage from './Components/CreateActivity/CreateActivityPage';
import AccountPage from './Components/Account/Account';
import MyActivities from './Components/Activities/Activities';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/Signup" element={<SignUpForm/>}/>
        <Route path="/Login" element={<LoginForm/>}/>
        <Route path="/Home" element={<HomePage/>}/>
        <Route path="/CreateActivity" element={<CreateActivityPage/>}/>
        <Route path='/MyAccount' element={<AccountPage/>}/>
        <Route path='/Activities' element={<MyActivities/>}/>
      </Routes>
    </Router>
  );
}

export default App