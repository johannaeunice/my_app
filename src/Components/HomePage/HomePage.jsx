import React from 'react'
import NavBar from '../navBar/NavBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'

const ActivityDetails = ({ activity, onClose }) => {
  return (
    <div className="activity-details-overlay">
    <div className="activity-details">
      <span className="close-icon" onClick={onClose}>&times;</span>
      <h2>{activity.title}</h2>
      <p>{activity.description}</p>
      <p><strong>Category:</strong> {activity.category}</p>
      {activity.isUserCreated ? (
        <>
          <button className="btn-primary">Edit</button>
          <button className="btn-danger">Delete</button>
        </>
      ) : (
        <button className="btn-primary">Join</button>
      )}
    </div>
  </div>
  );
};
function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [selectedActivity, setSelectedActivity] = useState(null);

    const [activities, setActivities] = useState([
      { id: 1, title: "Mountain Adventure", description: "Join us for an exciting Mountain climbing this weekend! We want to go to the famous Mt. Cameroon.", category: "Outdoor", isEditing: false },
      { id: 2, title: "Food Tasting Event", description: "Come explore amazing food with fellow food lovers!", category: "Food", isEditing: false },
      { id: 3, title: "Limbe in Picture", description: "Capture the beauty of Limbe with our photography group.", category: "Creative", isEditing: false }
    ]);

   const [userActivities, setUserActivities] = useState([
        { id: 101, title: "Mama's Place", description: "There is a new restaurant at Molyko, called Mama's Place. Let's go and discover their dishes !", category: "Food", isEditing: false }
      ]);

      const handleActivityClick = (activity) => {
        setSelectedActivity(activity);
      };
    
      const handleCloseDetails = () => {
        setSelectedActivity(null);
      };

    const filteredActivities = activities.filter(activity =>
        (categoryFilter === "All" || activity.category === categoryFilter) &&
        activity.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
      const filteredUserActivities = userActivities.filter(activity =>
        (categoryFilter === "All" || activity.category === categoryFilter) &&
        activity.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const handleEdit = (id) => {
    setUserActivities(userActivities.map(activity =>
      activity.id === id ? { ...activity, isEditing: !activity.isEditing } : activity
    ));
  };

  const handleChange = (id, field, value) => {
    setUserActivities(userActivities.map(activity =>
      activity.id === id ? { ...activity, [field]: value } : activity
    ));
  };

  const handleDelete = (id) => {
    setUserActivities(userActivities.filter(activity => activity.id !== id));
  };

    return (
      <div className="home-page">
        <NavBar />
        <div className="home-container">
          <h1>Discover Activities</h1>
          <div className="search-filter-container">
          <input 
            type="text" 
            placeholder="Search activities..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
            <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-dropdown"
          >
              <option value="All">All</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Food">Food</option>
              <option value="Creative">Creative</option>
            </select>
          </div>
          <div className="activity-list">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="activity-card" onClick={() => handleActivityClick(activity)}>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              <button className="btn-form">More details</button>
            </div>
          ))}
        </div>
        
        <h1>My Activities</h1>
        <div className="activity-list">
          {filteredUserActivities.map((activity) => (
            <div key={activity.id} className="activity-card" onClick={() => handleActivityClick(activity)}>
              {activity.isEditing ? (
                <>
                  <input 
                    type="text" 
                    value={activity.title} 
                    onChange={(e) => handleChange(activity.id, "title", e.target.value)}
                  />
                  <textarea 
                    value={activity.description} 
                    onChange={(e) => handleChange(activity.id, "description", e.target.value)}
                  />
                  <button className="btn-form" onClick={() => handleEdit(activity.id)}>Save</button>
                </>
              ) : (
                <>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <button className="btn-form" onClick={() => handleEdit(activity.id)}>Edit</button>
                </>
              )}
              <button className="btn-danger" onClick={() => handleDelete(activity.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      {selectedActivity && <ActivityDetails activity={selectedActivity} onClose={handleCloseDetails} />}
    </div>
    );
  };

export default HomePage