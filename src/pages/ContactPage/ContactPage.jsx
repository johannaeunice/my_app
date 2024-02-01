// import React from 'react'
import HelmetProvider from 'react-helmet-async'
import './ContactPage.css'

const ContactPage = () => {
    return (
        <div className="container">
            <HelmetProvider>
                <html lang='en' />
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                    <title>Contact Page</title>
                </head>
            </HelmetProvider>
            {/* Top bar */}
            <div className="title">
                <h1>Contact Us</h1>
            </div>
        </div>
    )
}

export default ContactPage;