import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./RootLayout";
import Home from "./components/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Sign from "./components/register/Sign";
import MediSettings from "./components/notifications/MediSettings";
import Explore from "./components/Explore";
import MediBot from "./components/MediBot";
import DiseaseDetail from "./components/DiseaseDetail";
import NotificationBell from "./components/notifications/NotificationBell"; // Import the notification bell component

import { requestFcmToken, messaging } from "../src/components/notifications/firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/auth", element: <Sign /> },
      { path: "/register", element: <Register /> },
      { path: "/mediNotify", element: <MediSettings /> },
      { path: "/explore", element: <Explore /> },
      { path: "/medibot", element: <MediBot /> },
      { path: "/disease/:id", element: <DiseaseDetail /> },
    ],
  },
]);

const App = () => {
  const [fsm, setFsm] = useState(null);

  useEffect(() => {
    const fetchFcmToken = async () => {
      try {
        let token = localStorage.getItem("fcm_token") || (await getToken(messaging));
        if (!token) token = await requestFcmToken();
        if (token) {
          console.log("📲 Current FCM Token:", token);
          setFsm(token);
        } else {
          throw new Error("No FCM token available");
        }
      } catch (error) {
        console.error("❌ Error getting FCM token:", error);
      }
    };

    fetchFcmToken();
  }, []);

  useEffect(() => {
    if (!fsm) return;
    const fetchNotifications = async () => {
      try {
        console.log("📡 Fetching notifications for token:", fsm);
        const response = await fetch(`https://carely-health-7zfg.onrender.com/notify/get-notifications?fsm=${fsm}`);
        const data = await response.json();
        if (data.success && Array.isArray(data.notifications)) {
          console.log("✅ Notifications fetched:", data.notifications);
        } else {
          console.error("❌ Unexpected response format:", data);
        }
      } catch (error) {
        console.error("❌ Error fetching notifications:", error);
      }
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fsm]);

  return (
    <div className="main">
    
      <RouterProvider router={browserRouter} />
    </div>
  );
};

export default App;
