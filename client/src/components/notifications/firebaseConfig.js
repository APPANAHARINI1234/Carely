import { initializeApp } from "firebase/app";
import { getMessaging, getToken, deleteToken, onMessage } from "firebase/messaging";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyCCT4SNIO3hrb2Vo7LmCRNJTaPIU9_oMQI",
  authDomain: "carely-50b41.firebaseapp.com",
  projectId: "carely-50b41",
  storageBucket: "carely-50b41.appspot.com",
  messagingSenderId: "859854972990",
  appId: "1:859854972990:web:035bfe233a5fef4620896f",
  measurementId: "G-NV7SFQQG87",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// 🔄 Global token variable
let latestToken = null;

// Get stored token
const getStoredToken = () => localStorage.getItem("fcm_token");

// Save token
const saveToken = (token) => {
  latestToken = token;
  localStorage.setItem("fcm_token", token);
};

// ✅ Safe FCM token request with permission handling
export const requestFcmToken = async () => {
  try {
    // Step 1: Check permission
    let permission = Notification.permission;

    if (permission === "default") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      console.warn("🚫 Notification permission not granted or blocked.");
      return null;
    }

    // Step 2: Get token
    const token = await getToken(messaging, {
      vapidKey: "BMBAOrejkl7Ig0fGxb-oCNihxZa3sB-HOjaWX7DZb2eYpNpVulls9k8r6j6w0X5aE8KhOWYdJ9zDUWcaKACI_mI",
    });

    if (token) {
      saveToken(token);
      console.log("✅ New FCM Token:", token);
    } else {
      console.warn("⚠️ No FCM token received.");
    }

    return token;
  } catch (error) {
    console.error("❌ Error getting FCM token:", error);
    return null;
  }
};

// Delete FCM Token
export const removeFcmToken = async () => {
  try {
    const token = getStoredToken();
    if (!token) return null;

    await deleteToken(await getToken(messaging));
    localStorage.removeItem("fcm_token");
    latestToken = null;

    console.log("🗑️ Deleted FCM Token:", token);
    return token;
  } catch (error) {
    console.error("❌ Error deleting FCM token:", error);
    return null;
  }
};

// 🔄 Refresh FCM Token logic
export const refreshFcmToken = async () => {
  try {
    console.log("🔄 Checking for FCM Token refresh...");

    const oldToken = getStoredToken();
    const newToken = await requestFcmToken();

    if (!newToken) {
      console.warn("⚠️ Skipping token update due to permission denial.");
      return;
    }

    if (oldToken !== newToken) {
      console.log("🔄 Refreshing FCM Token...");
      saveToken(newToken);

      await axios.post("https://carely-health-7zfg.onrender.com/api/update-token", {
        oldToken,
        newToken,
      });

      console.log("✅ Token updated successfully.");
    } else {
      console.log("✅ FCM Token is still valid.");
    }
  } catch (error) {
    console.error("❌ Error refreshing FCM token:", error);
  }
};

// Run on page load
window.addEventListener("load", async () => {
  await refreshFcmToken();
});

// Auto-refresh every 10 minutes
setInterval(refreshFcmToken, 10 * 60 * 1000);

// Listen for incoming messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("🔔 Message received:", payload);
      resolve(payload);
    });
  });

// Export messaging and token
export { messaging, latestToken };
