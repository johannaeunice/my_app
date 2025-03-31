import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MapPin, Calendar, Users, LogOut, Loader, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '../navBar/NavBar';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const colors = {
  primary: '#007CC3',
  secondary: '#FF8C00',
  text: '#333333',
  background: '#FFFFFF',
  accent: '#F4F4F4'
};

const MyActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  useEffect(() => {
    fetchUserActivities();
  }, []);

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type = 'success') => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  const fetchUserActivities = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.get(
        'https://rrn24.techchantier.site/malingo/public/api/activities/user',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      setActivities(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError('Failed to load your activities. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuitActivity = async (activityId) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      await axios.post(
        `https://rrn24.techchantier.site/malingo/public/api/activities/${activityId}/leave`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // Remove the activity from the list
      setActivities(activities.filter(activity => activity.id !== activityId));
      
      // Close the modal if the activity is currently selected
      if (selectedActivity && selectedActivity.id === activityId) {
        setSelectedActivity(null);
      }

      showNotification("You've successfully left this activity");
    } catch (err) {
      console.error('Error leaving activity:', err);
      showNotification("Failed to leave the activity. Please try again.", "error");
    }
  };

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar/>
      {/* Notification */}
      {notification.show && (
        <motion.div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          } text-white max-w-xs`}
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
        >
          {notification.message}
        </motion.div>
      )}

      {/* Header Section */}
      <motion.div
        className="bg-white py-12 px-4 shadow-sm mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold"
            style={{ color: colors.text }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My <span style={{ color: colors.primary }}>Activities</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-gray-600 max-w-2xl "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Here you can view and manage all the activities you've joined on Malingo.
          </motion.p>
        </div>
      </motion.div>

      {/* Activities Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Loading State */}
        {loading && (
          <motion.div 
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Loader className="h-12 w-12 animate-spin text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">Loading your activities...</p>
          </motion.div>
        )}

        {/* Error State */}
        {!loading && error && (
          <motion.div 
            className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && activities.length === 0 && (
          <motion.div
            className="text-center py-20 bg-white rounded-lg shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="h-24 w-24 mx-auto mb-6 text-gray-300"
              initial={{ y: 10 }}
              animate={{ y: [10, 0, 10] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Users size={96} />
            </motion.div>
            <h3 className="text-xl font-medium mb-2">No activities joined yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              You haven't joined any activities yet. Explore the home page to find activities that interest you!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => window.location.href = '/home'}
                className="px-6 py-3"
                style={{ backgroundColor: colors.primary, color: "white" }}
              >
                Explore Activities
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Activity Cards Grid */}
        {!loading && !error && activities.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    y: -8,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 },
                  }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={activity.ActivityPhoto || FALLBACK_IMAGE}
                      alt={activity.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                    <motion.div
                      className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: colors.secondary, color: "white" }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {activity.category || "Activity"}
                    </motion.div>
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: colors.text }}
                    >
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {activity.description && activity.description.length > 80
                        ? activity.description.substring(0, 80) + "..."
                        : activity.description || "No description available."}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <MapPin size={16} className="mr-1" /> {activity.location || "Location not specified"}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar size={16} className="mr-1" /> {activity.date ? formatDate(activity.date) : 'Date not specified'} {activity.time && `at ${activity.time}`}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Users size={16} className="mr-1" /> {activity.numberOfMembers || "0"} members
                    </div>
                    <div className="flex gap-2 mt-4">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1"
                      >
                        <Button
                          className="w-full"
                          style={{ backgroundColor: colors.primary, color: "white" }}
                          onClick={() => setSelectedActivity(activity)}
                        >
                          View Details
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          variant="outline"
                          style={{ borderColor: colors.secondary, color: colors.secondary }}
                          onClick={() => handleQuitActivity(activity.id)}
                        >
                          <LogOut size={16} />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            // Close modal when clicking outside
            if (e.target === e.currentTarget) {
              setSelectedActivity(null);
            }
          }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden relative"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
          >
            <motion.button
              onClick={() => setSelectedActivity(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md"
              whileHover={{
                scale: 1.1,
                rotate: 90,
                backgroundColor: "#f8f8f8",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-full">
                <motion.img
                  src={selectedActivity.ActivityPhoto || FALLBACK_IMAGE}
                  alt={selectedActivity.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <motion.div
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                    style={{
                      backgroundColor: colors.secondary,
                      color: "white",
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedActivity.category || "Activity"}
                  </motion.div>
                  <motion.h3
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedActivity.title}
                  </motion.h3>
                </div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <div className="mb-6 flex-grow">
                  <motion.div
                    className="flex flex-wrap gap-4 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="flex items-center text-sm text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <MapPin
                        size={18}
                        style={{ color: colors.primary }}
                        className="mr-1"
                      />
                      {selectedActivity.location || "Location not specified"}
                    </motion.div>
                    <motion.div
                      className="flex items-center text-sm text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Calendar
                        size={18}
                        style={{ color: colors.primary }}
                        className="mr-1"
                      />
                      {selectedActivity.date ? formatDate(selectedActivity.date) : 'Date not specified'} 
                      {selectedActivity.time && ` at ${selectedActivity.time}`}
                    </motion.div>
                    <motion.div
                      className="flex items-center text-sm text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Users
                        size={18}
                        style={{ color: colors.primary }}
                        className="mr-1"
                      />
                      {selectedActivity.numberOfMembers || "0"} members
                    </motion.div>
                  </motion.div>

                  <motion.h4
                    className="text-lg font-medium mb-2"
                    style={{ color: colors.text }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    About this activity
                  </motion.h4>
                  <motion.p
                    className="text-gray-700 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {selectedActivity.description || "No description available."}
                  </motion.p>

                  {selectedActivity.link && (
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h4 className="text-lg font-medium mb-2" style={{ color: colors.text }}>Group Link</h4>
                      <motion.a
                        href={selectedActivity.link}
                        className="inline-flex items-center text-sm font-medium"
                        style={{ color: colors.primary }}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                      >
                        Join the {selectedActivity.title} group
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </motion.a>
                    </motion.div>
                  )}
                </div>

                <motion.div
                  className="mt-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    onClick={() => {
                      handleQuitActivity(selectedActivity.id);
                      setSelectedActivity(null);
                    }}
                    className="w-full py-3"
                    style={{
                      backgroundColor: colors.secondary,
                      color: "white",
                    }}
                  >
                    <LogOut size={18} className="mr-2" />
                    Leave Activity
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MyActivities;