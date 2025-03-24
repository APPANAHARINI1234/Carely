import { useEffect, useState, useRef } from "react";
import { requestFcmToken, messaging } from "./firebaseConfig";
import { getToken } from "firebase/messaging";

function NotificationBell() {
    const [fsm, setFsm] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const bellRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchFcmToken = async () => {
            try {
                let token = localStorage.getItem("fcm_token") || await getToken(messaging);
                if (!token) token = await requestFcmToken();

                if (token) {
                    console.log("📲 Current FCM Token:", token);
                    setFsm(token);
                } else {
                    throw new Error("No FCM token available");
                }
            } catch (error) {
                console.error("❌ Error getting FCM token:", error);
                setStatusMessage("⚠️ Error enabling notifications. Please try again.");
            }
        };
        fetchFcmToken();
    }, []);

    useEffect(() => {
        if (!fsm) return;

        const fetchNotifications = async () => {
            try {
                console.log("📡 Fetching notifications for token:", fsm);
                const response = await fetch(`http://localhost:5000/notify/get-notifications?fsm=${fsm}`);
                const data = await response.json();

                if (data.success && Array.isArray(data.notifications)) {
                    setNotifications(data.notifications);
                } else {
                    console.error("❌ Unexpected response format:", data);
                    setNotifications([]);
                }
            } catch (error) {
                console.error("❌ Error fetching notifications:", error);
                setNotifications([]);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, [fsm]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                bellRef.current && !bellRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatDateTime = (utcDateString) => {
        if (!utcDateString) return "";
        const date = new Date(utcDateString);
        const options = { timeZone: "Asia/Kolkata", hour12: true };
        const dateStr = date.toLocaleDateString("en-IN", { ...options, day: "2-digit", month: "2-digit", year: "numeric" });
        const timeStr = date.toLocaleTimeString("en-IN", { ...options, hour: "2-digit", minute: "2-digit", second: "2-digit" });
        return { date: dateStr, time: timeStr };
    };

    return (
        <div style={{ position: "relative" }}>
            {statusMessage && <p style={{ color: "red" }}>{statusMessage}</p>}
            <button ref={bellRef} onClick={() => setOpen(!open)} style={{ fontSize: "24px", cursor: "pointer" }}>
                🔔
                {notifications.length > 0 && (
                    <span style={{
                        backgroundColor: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "12px",
                        position: "absolute",
                        top: "-5px",
                        right: "-5px"
                    }}>
                        {notifications.length}
                    </span>
                )}
            </button>
            {open && (
                <div ref={dropdownRef} style={{
                    position: "absolute",
                    top: "40px",
                    right: "0",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    borderRadius: "5px",
                    width: "300px",
                    maxHeight: "300px",
                    overflowY: "auto",
                    padding: "10px",
                    zIndex: 1000
                }}>
                    {notifications.length > 0 ? (
                        notifications.map((notif, index) => {
                            const { date, time } = formatDateTime(notif.datetime);
                            return (
                                <div key={index} style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "10px",
                                    backgroundColor: notif.read ? "#f9f9f9" : "#e3f2fd"
                                }}>
                                    <strong>{notif.title}</strong>
                                    <p>{notif.body}</p>
                                    <small>📅 {date} | 🕒 {time}</small>
                                </div>
                            );
                        })
                    ) : (
                        <p>No new notifications</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default NotificationBell;