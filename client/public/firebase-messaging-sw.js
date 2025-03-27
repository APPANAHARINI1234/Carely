importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCCT4SNIO3hrb2Vo7LmCRNJTaPIU9_oMQI",
  authDomain: "carely-50b41.firebaseapp.com",
  projectId: "carely-50b41",
  storageBucket: "carely-50b41.appspot.com",
  messagingSenderId: "859854972990",
  appId: "1:859854972990:web:035bfe233a5fef4620896f",
  measurementId: "G-NV7SFQQG87",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
  console.log("📩 Received background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationBody = payload.notification.body;

  self.registration.showNotification(notificationTitle, {
    body: notificationBody,
    icon: "/firebase-logo.png",
  });

  // Send background notification to backend for storage
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST Offset in milliseconds
  const istDate = new Date(now.getTime() + istOffset);

  const notificationData = {
    title: notificationTitle,
    body: notificationBody,
    fcmToken: payload.data?.fcmToken || "", // Ensure token is included if available
    datetime: istDate.toISOString().slice(0, 16),
  };

  try {
    const response = await fetch("https://carely-health-7zfg.onrender.com/notify/store-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notificationData),
    });

    if (response.ok) {
      console.log("✅ Background notification stored in backend");
    } else {
      console.error("❌ Failed to store background notification in backend.");
    }
  } catch (error) {
    console.error("❌ Error sending background notification to backend:", error);
  }
});
