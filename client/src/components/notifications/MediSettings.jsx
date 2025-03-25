import { useEffect, useState } from "react";
import { requestFcmToken, onMessageListener } from "./firebaseConfig";
import NotificationSettings from "./NotificationSettings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

function MediSettings() {
    const [fsm, setFsm] = useState(localStorage.getItem("fcm_token") || "");

    useEffect(() => {
        const setupFirebase = async () => {
            try {
                const token = await requestFcmToken();
                if (token) {
                    setFsm(token);
                    localStorage.setItem("fcm_token", token);
                }
            } catch (error) {
                console.error("❌ Error setting up Firebase:", error);
            }
        };

        setupFirebase();
    }, []);

    useEffect(() => {
        const handleNotification = (payload) => {
            console.log("🔔 New Notification Received:", payload);

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

            const notificationData = {
                title: payload.notification?.title || "Reminder",
                body: payload.notification?.body || "Time to take your medicine!",
                datetime: `${istDate} ${istTime}`,
            };

            // ✅ Show toast notification for every message
            toast.info(
                <div style={{ textAlign: "left", padding: "10px", maxWidth: "300px", lineHeight: "1.5" }}>
                    <strong>{notificationData.title}</strong>
                    <br />
                    {notificationData.body}
                    <br /><br />
                    <strong>🕒 Time:</strong> {istTime}
                    <br />
                    <strong>📅 Date:</strong> {istDate}
                </div>,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: { maxWidth: "320px", wordWrap: "break-word" },
                }
            );

            // Send notification data to backend (optional)
            fetch("http://localhost:5000/notify/store-notification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(notificationData),
            }).catch((err) => console.error("❌ Error sending notification to backend:", err));
        };

        // ✅ Ensure continuous listening for notifications
        const listenForNotifications = async () => {
            while (true) {
                try {
                    const payload = await onMessageListener();
                    handleNotification(payload);
                } catch (err) {
                    console.error("❌ Error in message listener:", err);
                }
            }
        };

        listenForNotifications();
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>📅 Medicine Reminder App</h1>
            <NotificationSettings />
            {/* ✅ Toast Notification Container */}
            <ToastContainer />
        </div>
    );
}

export default MediSettings;