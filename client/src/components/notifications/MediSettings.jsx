import { useEffect, useState } from "react";
import { requestFcmToken, onMessageListener } from "./firebaseConfig";
import NotificationSettings from "./NotificationSettings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, Typography, IconButton } from "@mui/material";

// Use emoji icon instead of Material UI icon
const BellIcon = () => <span style={{ fontSize: "2rem" }}>🔔</span>;

import "./MediSettings.css";

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
                fcmToken: fsm,
            };

            // ✅ Modern Toast Notification
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
            {/* ✅ Beautiful Card Design */}
            <Card className="medi-card">
                <CardContent>
                    <Typography variant="h4" className="medi-title">
                        Medicine Reminder
                    </Typography>
                   
                    <NotificationSettings />
                </CardContent>
            </Card>

            {/* ✅ Toast Notification Container */}
            <ToastContainer />
        </div>
    );
}

export default MediSettings;
