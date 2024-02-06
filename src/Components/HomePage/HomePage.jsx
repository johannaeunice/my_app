import React, {Component} from 'react'
import './HomePage.css';
import history from '../history'
import { HelmetProvider } from 'react-helmet-async';
import {useNavigate, Link} from 'react-router-dom';
import Login_Signup from '../login_signup/Loginsignup';

// export async function loader(){
//     const contact = await ContactPage();
//     return {contact};
// }

const HomePage = (props) => {
    const navigate = useNavigate();
    
    
    return (
        <div className='container'>

            <HelmetProvider>
                <html lang='en' />
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                    <title>Home Page</title>
                </head>
            </HelmetProvider>
                {/* Top bar */}
                <aside className='top'>
                    <div className="contact">
                        
                        
                            <button className='btn'
                                onClick={() => history.push('/ContactPage')}
                            >
                                <span className="material-symbols-outlined">
                                    contact_support
                                </span>
                                Contacts
                            </button>
                        
                        
                    </div>
                    {/* add toggle for light and dark modes */}
                </aside>

                {/* Main */}
                <main>
                    <div className="box">
                        <h1>Le Nkap</h1>
                        <h3>Welcome Pal !</h3>
                        <p>Get a whole new experience with our expense tracker!</p>
                        <p>Are you new here ?</p>
                        <p>If yes, click on the button below to get a full experience of our website!</p>
                        <a href='/Login_Sinup'>
                            <button className='btn'
                            onClick={() => navigate('/Login_Signup')}
                            >
                                create account
                            </button>
                        </a>
                    </div>
                </main>

                {/* bottom */}
                <aside className='bottom'>
                    <div className="feedback">
                        <a href="#">
                            <button className='btn'>
                                <span className='material-symbols-outlined'>
                                    chat
                                </span>
                                Feedback
                            </button>
                        </a>
                    </div>
                </aside>
                
            </div>
    )
}

export default HomePage;