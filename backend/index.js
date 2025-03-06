const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth.js");

const app = express();

app.use(express.json());

// Fix CORS issues
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const cron = require("node-cron");
const MedicalNotification = require("./models/MedicalNotification");

// Function to send notification (Email, SMS, Web Push)
const sendNotification = (user, title) => {
  console.log(`🔔 Reminder for ${user.email}: ${title}`);
};

// Run every minute to check upcoming notifications
cron.schedule("* * * * *", async () => {
  console.log("⏳ Checking for medical notifications...");

  const now = new Date();
  const upcomingNotifications = await MedicalNotification.find({
    dateTime: { $lte: now },
  }).populate("userId"); // Get user details

  upcomingNotifications.forEach((notification) => {
    sendNotification(notification.userId, notification.title);

    // Remove non-repeating notifications
    if (notification.repeat === "none") {
      MedicalNotification.findByIdAndDelete(notification._id).exec();
    } else {
      let nextDate = new Date(notification.dateTime);
      if (notification.repeat === "daily") nextDate.setDate(nextDate.getDate() + 1);
      if (notification.repeat === "weekly") nextDate.setDate(nextDate.getDate() + 7);
      if (notification.repeat === "monthly") nextDate.setMonth(nextDate.getMonth() + 1);

      MedicalNotification.findByIdAndUpdate(notification._id, { dateTime: nextDate }).exec();
    }
  });
});
