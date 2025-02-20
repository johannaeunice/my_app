import React from 'react'
import NavBar from '../navBar/NavBar';
import { useState } from 'react';
import './HomePage.css'

function HomePage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
  
    const activities = [
      { title: "Hiking Adventure", description: "Join us for an exciting hiking trip this weekend!", category: "Outdoor" },
      { title: "Food Tasting Event", description: "Come explore amazing food with fellow food lovers!", category: "Food" },
      { title: "Photography Walk", description: "Capture the beauty of the city with our photography group.", category: "Creative" }
    ];
  
    const filteredActivities = activities.filter(activity =>
      (filter === "All" || activity.category === filter) &&
      activity.title.toLowerCase().includes(search.toLowerCase())
    );
  
    return (
      <div className="home-page">
        <NavBar />
        <div className="home-container">
          <h1>Discover Activities</h1>
          <div className="search-filter-container">
            <input 
              type="text" 
              placeholder="Search activities..." 
              className="search-bar" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
            <select className="filter-dropdown" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Food">Food</option>
              <option value="Creative">Creative</option>
            </select>
          </div>
          <div className="activity-list">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity, index) => (
                <div key={index} className="activity-card">
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <button className="button-primary">Join</button>
                </div>
              ))
            ) : (
              <p className="no-results">No activities found.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

export default HomePage