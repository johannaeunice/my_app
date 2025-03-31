import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userData = sessionStorage.getItem("user");
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-[#007CC3] to-[#FF8C00] bg-clip-text text-transparent">Malingo</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className={`transition-colors duration-300 ${
                  isActive("/") 
                    ? "text-[#007CC3] font-medium" 
                    : "text-gray-600 hover:text-[#007CC3]"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/activities" 
                className={`transition-colors duration-300 ${
                  isActive("/activities") 
                    ? "text-[#007CC3] font-medium" 
                    : "text-gray-600 hover:text-[#007CC3]"
                }`}
              >
                Activities
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors duration-300 ${
                  isActive("/about") 
                    ? "text-[#007CC3] font-medium" 
                    : "text-gray-600 hover:text-[#007CC3]"
                }`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors duration-300 ${
                  isActive("/contact") 
                    ? "text-[#007CC3] font-medium" 
                    : "text-gray-600 hover:text-[#007CC3]"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Auth Buttons or User Profile */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-[#007CC3] flex items-center justify-center text-white">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-gray-700">{user?.name?.split(" ")[0] || "User"}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                    >
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                      <Link 
                        to="/my-activities" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Activities
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[#007CC3] hover:text-[#006ba7]"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#007CC3] text-white px-4 py-2 rounded-lg hover:bg-[#006ba7] transition-colors duration-300"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col space-y-3 py-4">
                <Link 
                  to="/" 
                  className={`transition-colors duration-300 py-2 ${
                    isActive("/") 
                      ? "text-[#007CC3] font-medium" 
                      : "text-gray-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/activities" 
                  className={`transition-colors duration-300 py-2 ${
                    isActive("/activities") 
                      ? "text-[#007CC3] font-medium" 
                      : "text-gray-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Activities
                </Link>
                <Link 
                  to="/about" 
                  className={`transition-colors duration-300 py-2 ${
                    isActive("/about") 
                      ? "text-[#007CC3] font-medium" 
                      : "text-gray-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className={`transition-colors duration-300 py-2 ${
                    isActive("/contact") 
                      ? "text-[#007CC3] font-medium" 
                      : "text-gray-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                
                <div className="border-t border-gray-200 my-2"></div>
                
                {isLoggedIn ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="py-2 text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/my-activities" 
                      className="py-2 text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Activities
                    </Link>
                    <Link 
                      to="/settings" 
                      className="py-2 text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="py-2 text-red-600 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link 
                      to="/login" 
                      className="py-2 text-[#007CC3]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="bg-[#007CC3] text-white py-2 px-4 rounded-lg text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;