importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCCT4SNIO3hrb2Vo7LmCRNJTaPIU9_oMQI",
  authDomain: "carely-50b41.firebaseapp.com",
  projectId: "carely-50b41",
  storageBucket: "carely-50b41.appspot.com", // ✅ Fixed storageBucket
  messagingSenderId: "859854972990",
  appId: "1:859854972990:web:035bfe233a5fef4620896f",
  measurementId: "G-NV7SFQQG87",
});

const messaging = firebase.messaging();

// Handle Background Messages
messaging.onBackgroundMessage((payload) => {
  console.log("📩 Received background message:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  });
});
