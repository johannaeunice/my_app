// import {Component} from 'react';
import {Router, Routes, Route} from 'react-router-dom';

import HomePage from './HomePage/HomePage';
import ContactPage from './ContactPage/ContactPage';
import Login_Signup from './login_signup/LoginSignup'

export default function Paths() {
    
        return(
            <Router history={history}>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/ContactPage' element={<ContactPage/>}/>
                    <Route path='/Loginsignup' element={<Login_Signup/>}/>
                </Routes>
            </Router>
        )
    
}
