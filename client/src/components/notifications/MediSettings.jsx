import { useEffect, useState } from "react";
import { requestFcmToken, onMessageListener } from "./firebaseConfig";
import NotificationSettings from "./NotificationSettings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
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

            console.log(fsm);
            console.log(localStorage.getItem("fcm_token"));

            toast.info(
                <div style={{ textAlign: "left", padding: "10px", maxWidth: "300px", lineHeight: "1.5" }}>
                    <strong>{payload.notification?.title || "Reminder"}</strong>
                    <br />
                    {payload.notification?.body || "Time to take your medicine!"}
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
        };

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
        <div className="medi-container">
             <Card className="medi-card">
             <CardContent>
                <h1 className="medi-title">📅 Medicine Reminder</h1>
                <NotificationSettings />
                <ToastContainer />
                </CardContent>
                </Card>
            </div>
        
    );
}

export default MediSettings;
