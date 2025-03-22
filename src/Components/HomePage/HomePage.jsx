'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { User, PlusCircle, List, Search, LogOutIcon } from 'lucide-react';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const FALLBACK_IMAGE = '/fallback.jpg';

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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between fixed h-full">
        <div>
          <h2 className="text-xl font-bold mb-6">Malingo</h2>
          <nav className="flex flex-col gap-4">
            <Button variant="ghost" className="flex items-center gap-2 text-left">
              <User size={20} /> My Account
            </Button>
            <Button variant="ghost" className="flex items-center gap-2 text-left">
              <PlusCircle size={20} /> Create Activity
            </Button>
            <Button variant="ghost" className="flex items-center gap-2 text-left">
              <List size={20} /> My Activities
            </Button>
            
          </nav>
        </div>
        <Button onClick={handleLogout} 
        variant="destructive" className="flex mb-0 gap-3 text-left">
              <LogOutIcon size={20} /> Logout
            </Button>
        <p className="text-xs text-gray-400">&copy; 2025 Malingo</p>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6">
        <div className="mb-6 flex items-center gap-3">
          <Search size={20} className="text-gray-500" />
          <Input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full "
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredActivities.map((activity) => (
            <motion.div
              key={activity.id}
              className="bg-white p-4 border rounded shadow-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedActivity(activity)}
            >
              <img 
                src={activity.ActivityPhoto || FALLBACK_IMAGE} 
                alt={activity.title} 
                className="w-full h-48 object-cover rounded" 
              />
              <h3 className="text-xl font-bold mt-2">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.description.length > 30 ? activity.description.substring(0, 30) + "..." : activity.description}</p>
              <p className="text-sm font-semibold">{activity.date} at {activity.time}</p>
              {joinedActivities.has(activity.id) ? (
                <button className="bg-green-500 text-white mt-2 p-2 rounded">Request Sent</button>
              ) : (
                <Button className="bg-black text-white mt-2">See more</Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity Details Popup */}
      {selectedActivity && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white p-6 rounded shadow-lg w-1/2 relative">
            <button onClick={() => setSelectedActivity(null)} className="absolute top-2 right-2 text-black">
              <FaTimes size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img 
                src={selectedActivity.ActivityPhoto || FALLBACK_IMAGE} 
                alt={selectedActivity.title} 
                className="w-full h-auto rounded" 
              />
              <div>
                <h3 className="text-2xl font-bold">{selectedActivity.title}</h3>
                <p>{selectedActivity.description}</p>
                <p><strong>Location:</strong> {selectedActivity.location}</p>
                <p><strong>Date:</strong> {selectedActivity.date} at {selectedActivity.time}</p>
                <p><strong>Members:</strong> {selectedActivity.numberOfMembers}</p>
                <p><a href={selectedActivity.link} className="text-blue-600 underline">{selectedActivity.title}</a></p>
                {joinedActivities.has(selectedActivity.id) ? (
                  <Button className="mt-4 bg-green-500 text-white">Request Sent</Button>
                ) : (
                  <Button onClick={() => handleJoinActivity(selectedActivity.id)} className="mt-4 bg-black text-white">Join</Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
