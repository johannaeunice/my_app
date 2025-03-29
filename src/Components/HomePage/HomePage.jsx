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

// New color palette based on SRS with improved usage
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
  const [categories, setCategories] = useState(['All', 'Travel', 'Dining', 'Hiking', 'Sports', 'Movies']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://rrn24.techchantier.site/malingo/public/api/activity')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const filteredActivities = activities.filter((activity) =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || activity.category === selectedCategory)
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className="w-64 text-white p-5 flex flex-col justify-between fixed h-full"
        style={{ background: colors.sidebar }}
      >
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <span style={{ color: colors.secondary }}>M</span>
            <span>alingo</span>
          </h2>
          <nav className="flex flex-col gap-4">
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 text-left hover:bg-white hover:bg-opacity-10 transition-all"
            >
              <User size={20} /> My Account
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 text-left hover:bg-white hover:bg-opacity-10 transition-all"
            >
              <PlusCircle size={20} /> Create Activity
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 text-left hover:bg-white hover:bg-opacity-10 transition-all"
            >
              <List size={20} /> My Activities
            </Button>
          </nav>
        </div>
        <div className="space-y-3">
          <Button 
            onClick={handleLogout}
            className="flex w-full justify-start items-center gap-3 text-left bg-transparent hover:bg-white hover:bg-opacity-10 border border-red-400 text-red-400"
          >
            <LogOutIcon size={20} /> Logout
          </Button>
          <p className="text-xs text-gray-400">&copy; 2025 Malingo</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
          Discover Activities
        </h1>
        
        {/* Search Bar */}
        <div className="mb-6 flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm">
          <Search size={20} style={{ color: colors.primary }} />
          <Input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-none focus:ring-0"
          />
        </div>
        
        {/* Categories */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm whitespace-nowrap ${
                selectedCategory === category 
                  ? 'text-white' 
                  : 'text-gray-700 bg-white hover:bg-gray-100'
              }`}
              style={selectedCategory === category ? { backgroundColor: colors.primary } : {}}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredActivities.map((activity) => (
            <motion.div
              key={activity.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => setSelectedActivity(activity)}
            >
              <div className="relative">
                <img 
                  src={activity.ActivityPhoto || FALLBACK_IMAGE} 
                  alt={activity.title} 
                  className="w-full h-48 object-cover" 
                />
                <div 
                  className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: colors.secondary, color: 'white' }}
                >
                  {activity.category || 'Activity'}
                </div>
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
                  <div 
                    className="w-full py-2 rounded text-center text-white font-medium"
                    style={{ backgroundColor: colors.success }}
                  >
                    Request Sent
                  </div>
                ) : (
                  <Button 
                    className="w-full"
                    style={{ backgroundColor: colors.primary, color: 'white' }}
                  >
                    See more
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No activities found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new activity!</p>
            <Button 
              className="mt-4"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <PlusCircle size={16} className="mr-2" /> Create Activity
            </Button>
          </div>
        )}
      </div>

      {/* Activity Details Popup */}
      {selectedActivity && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button 
              onClick={() => setSelectedActivity(null)} 
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md"
            >
              <FaTimes size={16} style={{ color: colors.text }} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-full">
                <img 
                  src={selectedActivity.ActivityPhoto || FALLBACK_IMAGE} 
                  alt={selectedActivity.title} 
                  className="w-full h-full object-cover" 
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6"
                >
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                    style={{ backgroundColor: colors.secondary, color: 'white' }}
                  >
                    {selectedActivity.category || 'Activity'}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedActivity.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6 flex flex-col h-full">
                <div className="mb-6 flex-grow">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={18} style={{ color: colors.primary }} className="mr-1" /> 
                      {selectedActivity.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={18} style={{ color: colors.primary }} className="mr-1" /> 
                      {selectedActivity.date} at {selectedActivity.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={18} style={{ color: colors.primary }} className="mr-1" /> 
                      {selectedActivity.numberOfMembers || '0'} members
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-medium mb-2">About this activity</h4>
                  <p className="text-gray-700 mb-4">{selectedActivity.description}</p>
                  
                  {selectedActivity.link && (
                    <div className="mb-4">
                      <h4 className="text-lg font-medium mb-2">Group Link</h4>
                      <a 
                        href={selectedActivity.link} 
                        className="inline-flex items-center text-sm underline"
                        style={{ color: colors.primary }}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {selectedActivity.title} group
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="mt-auto">
                  {joinedActivities.has(selectedActivity.id) ? (
                    <Button 
                      className="w-full py-3"
                      style={{ backgroundColor: colors.success, color: 'white' }}
                    >
                      Request Sent
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleJoinActivity(selectedActivity.id)} 
                      className="w-full py-3"
                      style={{ backgroundColor: colors.primary, color: 'white' }}
                    >
                      Join Activity
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}