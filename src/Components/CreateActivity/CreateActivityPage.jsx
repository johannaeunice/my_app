import { useState } from "react";
import React from "react";
import "./CreateActivityPage.css";
import NavBar from "../navBar/NavBar";

const formatDatetime = (dateTimeString) => {
  if (!dateTimeString) return "";

  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = "00"; // Ajout des secondes

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
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  
  const token = sessionStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");

    if (!token) {
      console.error("No token found! User must log in.");
      setMessage("You must be logged in to create an activity.");
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
        setTitle("");
        setDescription("");
        setTime("");
        setLocation("");
        setLink("");
        setNumberOfMembers("");
        setActivityPhoto(null);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Failed to create activity. Try again.");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("A network error occurred. Please check your connection.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="create-activity-page">
        <div className="create-activity-container">
          <h1>Create a New Activity</h1>
          {message && <div className={isSuccess ? "success-popup" : "error-popup"}>{message}</div>}
          <form onSubmit={handleSubmit} className="activity-form" encType="multipart/form-data">
            <input
              type="text"
              placeholder="Activity Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Activity Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="datetime-local"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="Activity Link (optional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <input
              type="number"
              placeholder="Number of Members"
              value={numberOfMembers}
              onChange={(e) => setNumberOfMembers(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setActivityPhoto(e.target.files[0])}
              required
            />
            <button type="submit" className="btn-form">
              Create Activity
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateActivityPage;