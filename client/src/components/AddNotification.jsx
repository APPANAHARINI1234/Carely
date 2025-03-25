import React, { useState } from "react";
import { useUser } from "./UserContext"; // ✅ Correct import

const AddNotification = () => {
  const { user } = useUser(); // ✅ Correct way to access user
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [repeat, setRepeat] = useState("none");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("User not found! Please log in.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/notifications/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        userId: user._id, 
        title, 
        description, 
        dateTime, 
        repeat 
      }),
    });

    if (response.ok) {
      alert("Notification added!");
      setTitle("");
      setDescription("");
      setDateTime("");
      setRepeat("none");
    } else {
      alert("Failed to add notification.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <input 
        type="datetime-local" 
        value={dateTime} 
        onChange={(e) => setDateTime(e.target.value)} 
        required 
      />
      <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
        <option value="none">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button type="submit">Add Notification</button>
    </form>
  );
};

export default AddNotification;
