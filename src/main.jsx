import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import Login_Signup from './Components/login_signup/LoginSignup'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Login_Signup/>
  </React.StrictMode>,
)
