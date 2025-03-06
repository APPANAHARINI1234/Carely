import { useUser } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Fetch notifications when user is available
  useEffect(() => {
    if (!user || !user._id) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/notifications/${user._id}`);
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [user]);

  // ✅ Add Notification Function
  const addNotification = async () => {
    if (!user || !user._id) return;

    const newNotification = {
      userId: user._id,
      title: "New Notification",
      dateTime: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/notifications/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotification),
      });

      if (!res.ok) {
        throw new Error("Failed to add notification");
      }

      const savedNotification = await res.json();
      setNotifications((prev) => [...prev, savedNotification]); // Update UI immediately
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  // ✅ Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".notification-container")) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      {/* Notification Bell */}
      {user && (
        <div className="notification-container">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing immediately
              setShowNotifications((prev) => !prev);
            }}
            className="notification-icon"
          >
            🔔
            {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
          </button>

          {showNotifications && (
            <div className="dropdown notifications-dropdown" onClick={(e) => e.stopPropagation()}>
              <h4>Notifications</h4>
              {notifications.length === 0 ? (
                <p>No new notifications</p>
              ) : (
                <ul>
                  {notifications.map((n) => (
                    <li key={n._id}>
                      <strong>{n.title}</strong> - {new Date(n.dateTime).toLocaleString()}
                    </li>
                  ))}
                </ul>
              )}
              <button className="add-notification-btn" onClick={addNotification}>
                ➕ Add Notification
              </button>
            </div>
          )}
        </div>
      )}

      {/* Profile / Login */}
      <div className="profile-container">
        {user ? (
          <div className="relative">
            <img
              src={user.profilePic || "https://via.placeholder.com/40"}
              alt="Profile"
              className="profile-icon"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <div className="dropdown">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <Link to="/edit-profile">Edit Profile</Link>
                <button onClick={() => console.log("Logout Clicked")}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
