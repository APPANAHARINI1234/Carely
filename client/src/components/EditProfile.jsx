import { useUser } from "../components/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProfile.css";

const EditProfile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate(); // For redirection
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profilePic: user?.profilePic || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/edit-profile",
        formData,
        { withCredentials: true }
      );

      // Update user context immediately
      setUser(res.data);

      alert("Profile updated!");

      // Redirect to home page
      navigate("/");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>

      {/* Show profile picture preview */}
      {formData.profilePic && (
        <img src={formData.profilePic} alt="Profile" className="profile-pic-preview" />
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="email" name="email" value={formData.email} readOnly />
        <input type="text" name="profilePic" value={formData.profilePic} onChange={handleChange} placeholder="Profile Picture URL" />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
