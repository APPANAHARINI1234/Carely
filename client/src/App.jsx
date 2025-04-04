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

import { requestFcmToken, messaging } from "../src/components/notifications/firebaseConfig";
import { getToken } from "firebase/messaging";

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
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // ✅ Store beforeinstallprompt event and enable install button
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Stop automatic prompt
      setDeferredPrompt(event); // Save event for later
      setShowInstallButton(true); // Show install button
      console.log("📢 Install prompt event stored");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // ✅ Trigger manual install prompt
  const handleInstall = () => {
    if (deferredPrompt) {
      console.log("🚀 Triggering install prompt...");
      deferredPrompt.prompt(); // Show install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("✅ User accepted the PWA install");
        } else {
          console.log("❌ User dismissed the PWA install");
        }
        setDeferredPrompt(null); // Reset event after use
        setShowInstallButton(false); // Hide install button after choice
      });
    } else {
      console.log("⚠️ No install prompt available");
    }
  };

  // ✅ Fetch FCM token
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

  // ✅ Fetch notifications periodically
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
      <div>
        <h1>Carely PWA</h1>
        {showInstallButton && (
          <button
            onClick={handleInstall}
            style={{
              padding: "10px",
              fontSize: "16px",
              background: "#0077b6",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            📲 Install Carely App
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
