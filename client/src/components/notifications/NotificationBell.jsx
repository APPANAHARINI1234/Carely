import { useEffect, useState, useRef } from "react";
import { requestFcmToken, messaging } from "./firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import "./NotificationBell.css";

function NotificationBell() {
    const [fsm, setFsm] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const bellRef = useRef(null);
    const dropdownRef = useRef(null);
    const audioRef = useRef(null);

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

    const playNotificationSound = () => {
        if (audioRef.current) {
            audioRef.current.volume = 1.0;
            audioRef.current.currentTime = 0;
            audioRef.current.muted = false;
            audioRef.current.play().catch(err => console.warn("🔇 Audio blocked:", err));
        }
    };

    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
            console.log("🔔 New notification received:", payload);
            playNotificationSound();
            const now = new Date();
            const istTime = new Intl.DateTimeFormat("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }).format(now);
            const istDate = new Intl.DateTimeFormat("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }).format(now);
            const newNotification = {
                title: payload.notification?.title || "New Notification",
                body: payload.notification?.body || "You have a new message!",
                datetime: `${istDate} ${istTime}`,
            };
            setNotifications((prev) => [newNotification, ...prev]);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unlockAudio = () => {
            if (audioRef.current) {
                audioRef.current.muted = false;
                audioRef.current.play().catch(() => null);
            }
            document.removeEventListener("click", unlockAudio);
        };
        document.addEventListener("click", unlockAudio);
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
        <div className="notification-bell">
            <audio ref={audioRef} src="http://localhost:5173/notification.mp3" preload="auto" muted playsInline />
            {statusMessage && <p className="status-message">{statusMessage}</p>}
            <button ref={bellRef} className="bell-icon" onClick={() => setOpen(!open)}>
                🔔
                {notifications.length > 0 && (
                    <span className="notification-badge">{notifications.length}</span>
                )}
            </button>
            {open && (
                <div ref={dropdownRef} className="notification-dropdown">
                    {notifications.length > 0 ? (
                        notifications.map((notif, index) => {
                            const { date, time } = formatDateTime(notif.datetime);
                            return (
                                <div key={index} className={`notification-item ${notif.read ? "read" : "unread"}`}>
                                    <strong>{notif.title}</strong>
                                    <p>{notif.body}</p>
                                    <small>📅 {date} | 🕒 {time}</small>
                                </div>
                            );
                        })
                    ) : (
                        <p className="no-notifications">No new notifications</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default NotificationBell;