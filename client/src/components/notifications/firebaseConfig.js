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

let firebaseApp = initializeApp(firebaseConfig);
let messaging = getMessaging(firebaseApp);

// 🔄 Global token variable to keep the latest FCM token
let latestToken = null;

// Get stored token
const getStoredToken = () => localStorage.getItem("fcm_token");

// Save token
const saveToken = (token) => {
  latestToken = token; // ✅ Always update global variable
  localStorage.setItem("fcm_token", token);
};

// Request FCM Token
export const requestFcmToken = async () => {
  try {
    let token = await getToken(messaging, {
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
    let token = getStoredToken();
    if (!token) return null;

    await deleteToken(await getToken(messaging)); 
    localStorage.removeItem("fcm_token");
    latestToken = null; // ✅ Clear global token

    console.log("🗑️ Deleted FCM Token:", token);
    return token;
  } catch (error) {
    console.error("❌ Error deleting FCM token:", error);
    return null;
  }
};

// 🔄 Auto-refresh FCM Token every 10 minutes
export const refreshFcmToken = async () => {
  try {
    console.log("🔄 Checking for FCM Token refresh...");

    let oldToken = getStoredToken();
    let newToken = await requestFcmToken();

    if (oldToken !== newToken) {
      console.log("🔄 Refreshing FCM Token...");
      saveToken(newToken);

      await axios.post("http://localhost:5000/api/update-token", {
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

// ✅ Call refresh on page load (ensures the latest token)
window.addEventListener("load", async () => {
  await refreshFcmToken();
});

// ✅ Auto-refresh every 10 minutes
setInterval(refreshFcmToken, 10 * 60 * 1000);

// 🔔 Listen for Incoming Messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("🔔 Message received:", payload);
      resolve(payload);
    });
  });

// ✅ Export latest token so other files can always use it
export { messaging, latestToken };
