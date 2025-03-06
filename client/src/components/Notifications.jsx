import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext"; // ✅ Correct import

const Notifications = () => {
  const { user } = useUser(); // ✅ Correct way to access user
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user || !user._id) return; // Ensure user is logged in

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

  return (
    <div>
      <h2>🔔 Medical Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li key={n._id}>
              <strong>{n.title}</strong> - {new Date(n.dateTime).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
