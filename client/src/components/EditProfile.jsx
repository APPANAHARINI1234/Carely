import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css"; 

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({ name: storedUser.name, email: storedUser.email, password: "" });
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5000/api/auth/edit-profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
      alert("Profile updated successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="New Password" />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
