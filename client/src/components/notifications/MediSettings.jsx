import { useEffect, useState, useRef } from "react";

import { requestFcmToken, onMessageListener, messaging } from "./firebaseConfig";
import NotificationSettings from "./NotificationSettings";

function MediSettings() {
    const [notification, setNotification] = useState(null);
    const [fsm, setFsm] = useState(localStorage.getItem("fcm_token") || ""); 
    const listenerSet = useRef(false); // ✅ Prevent multiple listeners

    useEffect(() => {
        const setupFirebase = async () => {
            try {
                let token = fsm || await requestFcmToken();
                if (token) {
                    setFsm(token);
                    localStorage.setItem("fcm_token", token);
                }

                // ✅ Ensure listener is added only ONCE
                if (!listenerSet.current) {
                    listenerSet.current = true; // ✅ Mark listener as set

                    onMessageListener()
                        .then(async (payload) => {
                            console.log("🔔 New Notification Received:", payload);

                            const istDate = new Date();
                            istDate.setHours(istDate.getHours() + 5);
                            istDate.setMinutes(istDate.getMinutes() + 30);

                            const notificationData = {
                                title: payload.notification?.title || "Reminder",
                                body: payload.notification?.body || "Time to take your medicine!",
                                fcmToken: token,
                                datetime: istDate.toISOString().slice(0, 16),
                            };

                            console.log("📦 Sending Notification Data to Backend:", notificationData);
                            setNotification(notificationData);

                            const response = await fetch("http://localhost:5000/notify/store-notification", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(notificationData),
                            });

                            if (response.ok) {
                                console.log("✅ Notification stored in backend");
                            } else {
                                console.error("❌ Failed to store notification in backend.");
                            }
                        })
                        .catch((err) => console.error("❌ Error in message listener:", err));
                }
            } catch (error) {
                console.error("❌ Error setting up Firebase:", error);
            }
        };

        setupFirebase();
    }, []); // ✅ Runs only once on mount

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>📅 Medicine Reminder App</h1>
            <NotificationSettings />
            {notification && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #4CAF50", borderRadius: "5px", backgroundColor: "#DFF2BF", display: "inline-block" }}>
                    <strong>{notification.title}</strong>
                    <p>{notification.body}</p>
                    <p><strong>🕒 Time:</strong> {new Date(notification.datetime).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: "Asia/Kolkata" })}</p>
                    <p><strong>📅 Date:</strong> {new Date(notification.datetime).toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Kolkata" })}</p>
                </div>
            )}
        </div>
    );
}

export default MediSettings;
