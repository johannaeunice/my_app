// import React from 'react'
import { useState } from 'react'
// import useWindowSize from '../../utils/useWindowSize'
import './LoginSignup.css'
import account_icon from '../icons/account_circle.png'
import email_icon from '../icons/alternate_email.png'
import password_icon from '../icons/lock.png'
import feedback_icon from '../icons/feedback.png'
import contact_icon from '../icons/contact_support.png'

function LoginSignup() {

  // const {width} = useWindowSize();
  const [action, setAction] = useState("Sign Up");

  return (

    <div className='main'>
      <div className="top">
        <div className="btn">
          <a href="#">
            <button type="button">
              <img src={contact_icon} alt="" /> Contacts
            </button>
          </a>
        </div>
        {/* add toggle for light and dark modes ! */}
      </div>
      <title>Sign Up | Login</title>
      <div className="form">
      <div className='container'>
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action==="Login"? <div></div>:<div className="input">
            <img src={account_icon} alt="" />
            <input type="text" placeholder='Name' />
          </div>}
          
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder='E-mail Id' />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder='Password' />
          </div>
        </div>
        {/* <p>
          Already have an account ? <a href="#">Click Here !</a>
        </p> */}
       
        {action==="Login"?<div></div>:<div className="forgot-password">Already have an account ? 
          <a href="#" className='link' onClick={()=>{setAction("Login")}}> Click Here to login!</a>
          <div className='btn'>
          <button type="submit">Sign Up</button>
            </div>
          </div>}
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgotten Password ?
          <a href="#" className='link'> Click Here!</a>
          
          </div>}
          {action==="Sign Up"?<div></div>:<div className="forgot-password">No Account ?
          <a href="#" className='link' onClick={()=>{setAction("Sign Up")}}> Click Here to create one!</a>
          <div className="btn">
            <button >Login</button>
          </div>
          </div>}

        {/* <div className="submit-container">
          <div className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={()=>{setAction("Sign Up")}}>
            <button type='submit'>Sign Up</button>
          </div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={()=>{setAction("Login")}}>Login</div>
        </div> */}
        </div>
        
        <div className="bottom">
          <div className="btn">
            <a href="#">
              <button type='button'>
                <img src= {feedback_icon} alt="" />Feedback
              </button>
            </a>
          </div>
        </div>
      </div>
      </div>
  )
}

export default LoginSignup;