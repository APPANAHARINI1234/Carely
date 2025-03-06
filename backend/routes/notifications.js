const express = require("express");
const MedicalNotification = require("../models/MedicalNotification");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { userId, title, description, dateTime, repeat } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newNotification = new MedicalNotification({
      userId,
      title,
      description,
      dateTime,
      repeat,
    });

    await newNotification.save();
    res.status(201).json(newNotification); // ✅ Return the saved notification
    
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Fetch Notifications for Logged-in User
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await MedicalNotification.find({ userId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Edit a Notification
router.put("/:id", async (req, res) => {
  try {
    const { title, description, dateTime, repeat } = req.body;
    const updatedNotification = await MedicalNotification.findByIdAndUpdate(
      req.params.id,
      { title, description, dateTime, repeat },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete a Notification
router.delete("/:id", async (req, res) => {
  try {
    const deletedNotification = await MedicalNotification.findByIdAndDelete(req.params.id);

    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
