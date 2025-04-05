import { useState, useEffect } from "react";
import React from "react";
import "./CreateActivityPage.css";
import NavBar from "../navBar/NavBar";
import { 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Users, 
  FileImage, 
  Edit, 
  Info, 
  Clock,
  Send
} from "lucide-react";
import { motion } from "framer-motion";

const formatDatetime = (dateTimeString) => {
  if (!dateTimeString) return "";

  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = "00"; // Seconds addition

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function CreateActivityPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");
  const [activityPhoto, setActivityPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    // Create preview URL for the selected image
    if (activityPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(activityPhoto);
    } else {
      setPreviewUrl(null);
    }
  }, [activityPhoto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("Processing...");

    if (!token) {
      console.error("No token found! User must log in.");
      setMessage("You must be logged in to create an activity.");
      setIsLoading(false);
      return;
    }
    console.log("Token being sent:", token);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("numberOfMembers", numberOfMembers);
    formData.append("location", location);
    formData.append("time", formatDatetime(time));
    if (activityPhoto) {
      formData.append("ActivityPhoto", activityPhoto);
    }

    try {
      const response = await fetch("https://rrn24.techchantier.site/malingo/public/api/activity", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: formData,
      });

      console.log("Response received:", response);
      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Activity Created Successfully!");
        // Reset form fields
        setTitle("");
        setDescription("");
        setTime("");
        setLocation("");
        setLink("");
        setNumberOfMembers("");
        setActivityPhoto(null);
        setPreviewUrl(null);
        
        // Clear success message after delay
        setTimeout(() => setMessage(""), 3000);
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Failed to create activity. Try again.");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("A network error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-15">
      <NavBar />
      <motion.div 
        className="create-activity-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="create-activity-container"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="page-title">
            <Edit className="icon-title" size={28} />
            Create a New Activity
          </h1>
          
          {message && (
            <motion.div 
              className={isSuccess ? "success-popup" : "error-popup"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="activity-form" encType="multipart/form-data">
            <div className="input-group">
              <label htmlFor="title" className="input-label">
                <Edit size={18} /> Activity Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter a catchy title for your activity"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input-field"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="description" className="input-label">
                <Info size={18} /> Activity Description
              </label>
              <textarea
                id="description"
                placeholder="Describe what this activity is about"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="textarea-field"
                rows="4"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="time" className="input-label">
                <Clock size={18} /> Date & Time
              </label>
              <input
                id="time"
                type="datetime-local"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="input-field"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="location" className="input-label">
                <MapPin size={18} /> Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="Where will this activity take place?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="input-field"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="link" className="input-label">
                <LinkIcon size={18} /> Activity Link (optional)
              </label>
              <input
                id="link"
                type="url"
                placeholder="Share a WhatsApp group link or relevant URL"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="input-field"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="numberOfMembers" className="input-label">
                <Users size={18} /> Number of Members
              </label>
              <input
                id="numberOfMembers"
                type="number"
                placeholder="How many people can join?"
                value={numberOfMembers}
                onChange={(e) => setNumberOfMembers(e.target.value)}
                required
                className="input-field"
                min="1"
              />
            </div>
            
            <div className="input-group file-input-group">
              <label htmlFor="activityPhoto" className="input-label">
                <FileImage size={18} /> Activity Photo
              </label>
              <div className="file-input-container">
                <input
                  id="activityPhoto"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setActivityPhoto(e.target.files[0])}
                  required
                  className="file-input"
                />
                <label htmlFor="activityPhoto" className="file-input-label">
                  Choose an image
                </label>
                {previewUrl && (
                  <div className="image-preview-container">
                    <img src={previewUrl} alt="Preview" className="image-preview" />
                  </div>
                )}
              </div>
            </div>
            
            <motion.button 
              type="submit" 
              className="btn-form"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <Send size={18} /> Create Activity
                </>
              )}
            </motion.button>
          </form>
          
          <div className="form-footer">
            <p>Your activity will be visible to all Malingo users once created.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CreateActivityPage;