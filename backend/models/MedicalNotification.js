const mongoose = require("mongoose");

const MedicalNotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true }, // Example: "Take Blood Pressure Medicine"
  description: { type: String },
  dateTime: { type: Date, required: true }, // When to remind
  repeat: { type: String, enum: ["none", "daily", "weekly", "monthly"], default: "none" }, // Repeat reminder
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MedicalNotification", MedicalNotificationSchema);
