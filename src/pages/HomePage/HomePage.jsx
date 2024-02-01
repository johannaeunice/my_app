// import React from 'react'
import './HomePage.css';
import { HelmetProvider } from 'react-helmet-async';

const HomePage = () => {
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
                        <a href="#">
                            <button className='btn'>
                                <span className="material-symbols-outlined">
                                    contact_support
                                </span>
                                Contacts
                            </button>
                        </a>
                    </div>
                </aside>

                {/* Main */}
                <main>
                    <div className="box">
                        <h1>Le Nkap</h1>
                        <h3>Welcome Pal !</h3>
                        <p>Get a whole new experience with our expense tracker!</p>
                        <p>Are you new here ?</p>
                        <p>If yes, click on the button below to get a full experience of our website!</p>
                        <a href="#">
                            <button className='btn'>
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