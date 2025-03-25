import { useState, useEffect } from "react";
import { requestFcmToken, messaging } from "./firebaseConfig"; // Import Firebase messaging functions
import "./NotificationSettings.css"; // You can style this UI in your NotificationSettings.css file
import { getToken } from "firebase/messaging";

function NotificationSettings() {
    const [time, setTime] = useState("21:00");
    const [medicineName, setMedicineName] = useState("");
    const [dosage, setDosage] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [fsm, setFsm] = useState(""); // Store device token (FCM Token)

    useEffect(() => {
        const fetchFcmToken = async () => {
            try {
                const token = await requestFcmToken();
                if (token) {
                    console.log("✅ FCM Token:", token);
                    setFsm(token);
                    localStorage.setItem("fcm_token", token);
                }
            } catch (error) {
                console.error("❌ Error fetching FCM token:", error);
            }
        };
        fetchFcmToken();
    }, []);

    // Request permission and get FCM token
    const requestNotificationPermission = async () => {
        setLoading(true);
        setStatusMessage(""); // Clear previous messages

        try {
            let token = localStorage.getItem("fcm_token") || (await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" }));
            if (!token) token = await requestFcmToken();

            if (token) {
                console.log("✅ FCM Token:", token);
                setFsm(token); // Store token in state
                await saveNotificationSettings(token);
                setStatusMessage("✅ Notifications enabled and saved successfully!");
            } else {
                throw new Error("FCM token retrieval failed.");
            }
        } catch (error) {
            console.error("❌ Error getting FCM token:", error);
            setStatusMessage("⚠️ Error enabling notifications. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Save notification settings to backend
    const saveNotificationSettings = async (token) => {
        try {
            const response = await fetch("http://localhost:5000/api/save-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ medicineName, dosage, notifyAt: time, deviceToken: token }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to save settings.");
        } catch (error) {
            console.error("❌ Error saving notification settings:", error);
            setStatusMessage("⚠️ Error saving settings. Please try again.");
        }
    };

    return (
        <div className="notification-container">
            <h2>🔔 Set Medicine Reminder</h2>

            <div className="form-section">
                <div className="input-group">
                    <label>💊 Medicine Name:</label>
                    <input
                        type="text"
                        placeholder="Enter medicine name"
                        value={medicineName}
                        onChange={(e) => setMedicineName(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="input-group">
                    <label>💉 Dosage:</label>
                    <input
                        type="text"
                        placeholder="Enter dosage"
                        value={dosage}
                        onChange={(e) => setDosage(e.target.value)}
                        className="input-field"
                    />
                </div>

                <div className="input-group">
                    <label>⏰ Reminder Time:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="input-field"
                    />
                </div>
            </div>

            <button
                className={`enable-btn ${loading ? "loading" : ""}`}
                onClick={requestNotificationPermission}
                disabled={loading}
            >
                {loading ? "⏳ Setting Reminder..." : "✅ Enable Notifications"}
            </button>

            {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
    );
}

export default NotificationSettings;
