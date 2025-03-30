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

  if (!payload.notification) {
    console.error("❌ Notification payload is missing");
    return;
  }

  const notificationTitle = payload.notification.title;
  const notificationBody = payload.notification.body;

  self.registration.showNotification(notificationTitle, {
    body: notificationBody,
    icon: "/firebase-logo.png",
  });

  // Send the notification data to the active web page
  self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "NEW_NOTIFICATION",
        payload: {
          title: notificationTitle,
          body: notificationBody,
          fcmToken: payload.data?.fcmToken || "",
          datetime: new Date().toISOString(),
        },
      });
    });
  });
});
