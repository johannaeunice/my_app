'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { User, PlusCircle, List, Search, LogOutIcon, MapPin, Calendar, Users } from 'lucide-react';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const FALLBACK_IMAGE = '/fallback.jpg';

// Color palette from SRS document
const colors = {
  primary: '#007CC3',      // Blue from SRS
  secondary: '#FF8C00',    // Orange from SRS
  accent: '#F4F4F4',       // Light Grey from SRS
  text: '#333333',         // Dark Grey from SRS
  background: '#FFFFFF',   // White from SRS
  sidebar: '#1A2238',      // Darker blue for sidebar
  success: '#34C759',      // Green for success states
  error: '#FF3B30',        // Red for errors
};

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [joinedActivities, setJoinedActivities] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://rrn24.techchantier.site/malingo/public/api/activity')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const filteredActivities = activities.filter((activity) =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinActivity = async (activityId) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to join an activity");
      return;
    }

    try {
      const response = await fetch(`https://rrn24.techchantier.site/malingo/public/api/activities/${activityId}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ activity_id: activityId }),
      });

      if (response.ok) {
        setJoinedActivities((prev) => new Set(prev).add(activityId));
      } else {
        alert("Failed to join activity");
      }
    } catch (error) {
      console.error("Error joining activity:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  // Sidebar button hover animation variants
  const sidebarButtonVariants = {
    initial: { 
      backgroundColor: "rgba(255, 255, 255, 0)",
      transition: { duration: 0.2 }
    },
    hover: { 
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderRadius: 10,
      x: 6,
      transition: { duration: 0.2 }
    }
  };

  // Logout button animations
  const logoutButtonVariants = {
    initial: { 
      borderColor: "rgba(255, 107, 107, 0.7)",
      backgroundColor: "rgba(255, 107, 107, 0)",
      scale: 1
    },
    hover: { 
      borderColor: "rgba(255, 107, 107, 1)",
      backgroundColor: "rgba(255, 107, 107, 0.1)",
      scale: 1.05,
      transition: { 
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div>
      <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className="w-64 text-white p-5 flex flex-col justify-between fixed h-full"
        style={{ background: colors.sidebar }}
      >
        <div>
          <motion.h2 
            className="text-2xl font-bold mb-8 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              style={{ color: colors.secondary }}
              animate={{ 
                scale: [1, 1.1, 1],
                rotateZ: [0, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              M
            </motion.span>
            <span>alingo</span>
          </motion.h2>
          <nav className="flex flex-col gap-4">
            <motion.div
              variants={sidebarButtonVariants}
              initial="initial"
              whileHover="hover"
            >
              <Button 
                variant="ghost" 
                className="flex w-full items-center gap-3 text-left transition-all"
              >
                <User size={20} /> My Account
              </Button>
            </motion.div>

            <motion.div
              variants={sidebarButtonVariants}
              initial="initial"
              whileHover="hover"
            >
              <Button 
                variant="ghost" 
                className="flex w-full items-center gap-3 text-left transition-all"
              >
                <PlusCircle size={20} /> Create Activity
              </Button>
            </motion.div>

            <motion.div
              variants={sidebarButtonVariants}
              initial="initial"
              whileHover="hover"
            >
              <Button 
                variant="ghost" 
                className="flex w-full items-center gap-3 text-left transition-all"
              >
                <List size={20} /> My Activities
              </Button>
            </motion.div>
          </nav>
        </div>
        <div className="space-y-3">
          <motion.div
            variants={logoutButtonVariants}
            initial="initial"
            whileHover="hover"
          >
            <Button 
              onClick={handleLogout}
              className="flex w-full justify-start items-center gap-3 text-left bg-transparent border border-red-400 text-red-400"
            >
              <motion.div
                animate={{ 
                  x: [0, 3, 0, 3, 0],
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2
                }}
              >
                <LogOutIcon size={20} />
              </motion.div>
              Logout
            </Button>
          </motion.div>
          <p className="text-xs text-gray-400">&copy; 2025 Malingo</p>
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="ml-64 flex-1 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-2xl font-bold mb-6" 
          style={{ color: colors.text }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover Activities
        </motion.h1>
        
        {/* Search Bar */}
        <motion.div 
          className="mb-6 flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <Search size={20} style={{ color: colors.primary }} />
          <Input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-none focus:ring-0"
          />
        </motion.div>
        
        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ 
                y: -10, 
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedActivity(activity)}
            >
              <div className="relative">
                <img 
                  src={activity.ActivityPhoto || FALLBACK_IMAGE} 
                  alt={activity.title} 
                  className="w-full h-48 object-cover" 
                />
                <motion.div 
                  className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: colors.secondary, color: 'white' }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {activity.category || 'Activity'}
                </motion.div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2" style={{ color: colors.text }}>
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {activity.description && activity.description.length > 80 
                    ? activity.description.substring(0, 80) + "..." 
                    : activity.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <MapPin size={16} className="mr-1" /> {activity.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar size={16} className="mr-1" /> {activity.date} at {activity.time}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Users size={16} className="mr-1" /> {activity.numberOfMembers || '0'} members
                </div>
                {joinedActivities.has(activity.id) ? (
                  <motion.div 
                    className="w-full py-2 rounded text-center text-white font-medium"
                    style={{ backgroundColor: colors.success }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Request Sent
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button 
                      className="w-full"
                      style={{ backgroundColor: colors.primary, color: 'white' }}
                    >
                      See more
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xl font-medium mb-2">No activities found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new activity!</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="mt-4"
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                <PlusCircle size={16} className="mr-2" /> Create Activity
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Activity Details Popup */}
      {selectedActivity && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden relative"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
            }}
          >
            <motion.button 
              onClick={() => setSelectedActivity(null)} 
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md"
              whileHover={{ 
                scale: 1.1, 
                rotate: 90,
                backgroundColor: "#f8f8f8" 
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={16} style={{ color: colors.text }} />
            </motion.button>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-full">
                <motion.img 
                  src={selectedActivity.ActivityPhoto || FALLBACK_IMAGE} 
                  alt={selectedActivity.title} 
                  className="w-full h-full object-cover" 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6"
                >
                  <motion.div 
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                    style={{ backgroundColor: colors.secondary, color: 'white' }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedActivity.category || 'Activity'}
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
                      <MapPin size={18} style={{ color: colors.primary }} className="mr-1" /> 
                      {selectedActivity.location}
                    </motion.div>
                    <motion.div 
                      className="flex items-center text-sm text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Calendar size={18} style={{ color: colors.primary }} className="mr-1" /> 
                      {selectedActivity.date} at {selectedActivity.time}
                    </motion.div>
                    <motion.div 
                      className="flex items-center text-sm text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Users size={18} style={{ color: colors.primary }} className="mr-1" /> 
                      {selectedActivity.numberOfMembers || '0'} members
                    </motion.div>
                  </motion.div>
                  
                  <motion.h4 
                    className="text-lg font-medium mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    About this activity
                  </motion.h4>
                  <motion.p 
                    className="text-gray-700 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {selectedActivity.description}
                  </motion.p>
                  
                  {selectedActivity.link && (
                    <motion.div 
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h4 className="text-lg font-medium mb-2">Group Link</h4>
                      <motion.a 
                        href={selectedActivity.link} 
                        className="inline-flex items-center text-sm underline"
                        style={{ color: colors.primary }}
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                      >
                        {selectedActivity.title} group
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
                  {joinedActivities.has(selectedActivity.id) ? (
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button 
                        className="w-full py-3"
                        style={{ backgroundColor: colors.success, color: 'white' }}
                      >
                        Request Sent
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button 
                        onClick={() => handleJoinActivity(selectedActivity.id)} 
                        className="w-full py-3"
                        style={{ backgroundColor: colors.primary, color: 'white' }}
                      >
                        Join Activity
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
    </div>
       
  );
}