import { useState } from "react";
import React from "react";
import "./CreateActivityPage.css";
import NavBar from "../navBar/NavBar";

function CreateActivityPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Outdoor");
  const [date, setDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Activity Created:", { title, description, category, date });
    setTitle("");
    setDescription("");
    setCategory("Outdoor");
    setDate("");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div>
      <NavBar />
      <div className="create-activity-page">
        <div className="create-activity-container">
          <h1>Create a New Activity</h1>
          <form onSubmit={handleSubmit} className="activity-form">
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Outdoor">Outdoor</option>
              <option value="Food">Food</option>
              <option value="Creative">Creative</option>
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <button type="submit" className="btn-form">
              Create Activity
            </button>
          </form>
          {showPopup && (
          <div className="popup">
            <span className="close-btn" onClick={() => setShowPopup(false)}>×</span>
            <p>Activity Created Successfully!</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default CreateActivityPage;
