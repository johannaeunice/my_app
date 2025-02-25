import React, { useState, useEffect } from 'react';
import NavBar from '../navBar/NavBar';
import { Link } from 'react-router-dom';
import './HomePage.css';

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const ActivityDetails = ({ activity, onClose }) => {
  return (
    <div className="activity-details-overlay">
      <div className="activity-details">
        <span className="close-icon" onClick={onClose}>&times;</span>
        {activity.ActivityPhoto && (
          <img src={`https://rrn24.techchantier.site/malingo/public/storage/${activity.ActivityPhoto}`} alt={activity.title} className="activity-image" />
        )}
        <h2>{activity.title}</h2>
        <p>{activity.description}</p>
        <p><strong>Location:</strong> {activity.location}</p>
        <p><strong>Date:</strong> {formatDate(activity.time)}</p>
        <p><strong>Members:</strong> {activity.numberOfMembers} joined</p>
        {activity.link && (
          <p><strong>More Info:</strong> <a href={activity.link} target="_blank" rel="noopener noreferrer">Click here</a></p>
        )}
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
    const [activities, setActivities] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
      const fetchActivities = async () => {
        try {
          const response = await fetch('https://rrn24.techchantier.site/malingo/public/api/activity', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          if (response.ok) {
            setActivities(data.activities || []);
          } else {
            console.error("Error fetching activities: ", data.message);
          }
        } catch (error) {
          console.error("Network error: ", error);
        }
      };
      if (token) {
        fetchActivities();
      }
    }, [token]);

    const handleActivityClick = async (activityId) => {
      try {
        const response = await fetch(`https://rrn24.techchantier.site/malingo/public/api/activity/${activityId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setSelectedActivity(data);
        } else {
          console.error("Error fetching activity details: ", data.message);
        }
      } catch (error) {
        console.error("Network error: ", error);
      }
    };
    
    const handleCloseDetails = () => {
      setSelectedActivity(null);
    };
    
    const filteredActivities = activities.filter(activity =>
      (categoryFilter === "All" || activity.category === categoryFilter) &&
      activity.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="home-page">
        <NavBar />
        <Link to="/CreateActivity">Create activity</Link>
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
              <div key={activity.id} className="activity-card" onClick={() => handleActivityClick(activity.id)}>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <button className="btn-form">More details</button>
              </div>
            ))}
          </div>
        </div>
        {selectedActivity && <ActivityDetails activity={selectedActivity} onClose={handleCloseDetails} />}
      </div>
    );
}

export default HomePage;
