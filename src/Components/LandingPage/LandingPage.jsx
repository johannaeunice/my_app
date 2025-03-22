import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const API_URL = "https://rrn24.techchantier.site/malingo/public/api/activity";
const FALLBACK_IMAGE = "/src/assets/fallback_image.png";

export default function HomePage() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setActivities(data);
        setFilteredActivities(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load activities.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = activities.filter(activity =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredActivities(filtered);
  }, [searchQuery, activities]);

  return (
    <div className="bg-white text-black">
      <nav className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold tracking-wide">Malingo</h1>
        <div className="space-x-4">
          <Button variant="outline" href="/">About Us</Button>
          <Button variant="outline" href="/">Contact Us</Button>
          <Button href="/login">Login</Button>
          <Button href="/signup">Create Account</Button>
        </div>
      </nav>

      <header className="text-center py-12 px-4">
        <h2 className="text-4xl font-bold mb-4">Find and Join Activities That Matter</h2>
        <p className="max-w-2xl mx-auto">
          Discover and participate in exciting social activities. Whether you’re into hiking, dining, or exploring new experiences, we bring people together to make meaningful connections.
        </p>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center gap-2 py-4 px-10 ">
        <input
          type="text"
          placeholder="Search activities..."
          className="p-2 border rounded w-2/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="bg-black text-white">Search</Button>
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {loading ? (
          <p>Loading activities...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredActivities.length > 0 ? (
          filteredActivities.map(activity => (
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
              <Button className="bg-black text-white mt-2">See more</Button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-red-600 text-xl col-span-full">No activity found.</p>
        )}
      </div>

      {/* Activity Popup */}
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
                <p><strong>Date:</strong> {selectedActivity.time}</p>
                <p><strong>Members:</strong> {selectedActivity.numberOfMembers}</p>
                <p><a href={selectedActivity.link} className="text-blue-600 underline">{selectedActivity.title}</a></p>
                <Link to="/Login"><Button className="mt-4 bg-black text-white">Join</Button></Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white text-center p-6 mt-10">
        <p>&copy; {new Date().getFullYear()} Malingo. All rights reserved.</p>
      </footer>
    </div>
  );
}