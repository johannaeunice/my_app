import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import ContactPage from './pages/ContactPage/ContactPage'
// import Login_Signup from './Components/login_signup/LoginSignup'

import HomePage from './pages/HomePage/HomePage'
import './index.css'

// const root= createRoot(rootElement);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 
    {/* <Login_Signup/> */}
    {/* <ContactPage/> */}
    <HomePage/>
  </React.StrictMode>,
)
