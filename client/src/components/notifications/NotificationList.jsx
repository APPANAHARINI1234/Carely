import { useEffect, useState } from "react";

const NotificationList = ({ fsm }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`https://carely-health-7zfg.onrender.com/notify/get-notifications?fsm=${fsm}`);
                const data = await response.json();
                if (data.success) {
                    setNotifications(data.notifications.reverse()); // Show most recent first
                } else {
                    console.error("Failed to fetch notifications:", data.message);
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [fsm]);

    return (
        <div>
            <h2>📜 Recent Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications yet.</p>
            ) : (
                <ul>
                    {notifications.map((notif, index) => (
                        <li key={index}>
                            <strong>{notif.medicineName}</strong> - {notif.dosage} <br />
                            <small>{new Date(notif.receivedAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotificationList;
