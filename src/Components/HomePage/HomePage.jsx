import React, { useState, useEffect } from 'react';
import NavBar from '../navBar/NavBar';
import { Link } from 'react-router-dom';
import './HomePage.css';

const formatDate = (dateString) => {
  if (!dateString) return "Unknown date";
  const options = { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const ActivityDetails = ({ activity, onClose }) => {
  return (
    <div className="activity-details-overlay">
      <div className="activity-details">
        <span className="close-icon" onClick={onClose}>&times;</span>
        {activity.ActivityPhoto ? (
          <img src={`https://rrn24.techchantier.site/malingo/public/storage/${activity.ActivityPhoto}`} alt={activity.title} className="activity-image" 
          onError={(e) => { e.target.src = "/fallback-image.jpg"; }} 
        />
        ) : (
          <p>No image available</p>
        )}
        <h2>{activity.title}</h2>
        <p>{activity.description}</p>
        <p><strong>Location:</strong> {activity.location || "Not specified"}</p>
        <p><strong>Date:</strong> {formatDate(activity.time)}</p>
        <p><strong>Members:</strong> {activity.numberOfMembers || 0} joined</p>
        {activity.link && (
          <p><strong>More Info:</strong> <a href={activity.link} target="_blank" rel="noopener noreferrer">Click here</a></p>
        )}
        <button className="btn-primary">Join</button>
      </div>
    </div>
  );
};

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://rrn24.techchantier.site/malingo/public/api/activity', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        console.log("API Response:", data);
  
        if (response.ok) {
          const fetchedActivities = data.activities || data || [];
          console.log("Parsed Activities:", fetchedActivities);
          
          if (Array.isArray(fetchedActivities)) {
            setActivities(fetchedActivities);
          } else {
            console.error("Unexpected data format:", fetchedActivities);
          }
        } else {
          console.error("Error fetching activities:", data.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false); 
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
        </div>
        {loading ? (
          <p>Loading activities...</p>
        ) : (
          <div className="activity-list">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <div key={activity.id} className="activity-card" onClick={() => handleActivityClick(activity.id)}>
                  {activity.ActivityPhoto ? (
                    <img src={`https://rrn24.techchantier.site/malingo/public/storage/${activity.ActivityPhoto}`} 
                    alt={activity.title} className="activity-thumbnail"
                    onError={(e) => {e.target.src = "/src/assets/fallback_image.png"}}
                     />

                  ) : (
                    <img src='/src/assets/fallback_image.png'
                    className='fallback'/>
                  )}

                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                  <button className="btn-form">More details</button>
                </div>
              ))
            ) : (
              <p>No activities found.</p>
            )}
          </div>
        )}
      </div>
      {selectedActivity && <ActivityDetails activity={selectedActivity} onClose={handleCloseDetails} />}
    </div>
  );
}

export default HomePage;
