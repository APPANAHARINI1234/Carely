const express = require("express");
const { ObjectId } = require("mongodb"); // For handling MongoDB ObjectIDs
const router = express.Router();

// Save notification settings (Insert Only, No Update)
router.post("/save-settings", async (req, res) => {
    try {
        const mediCollection = req.app.get("mediCollection");
        const { deviceToken, notifyAt, dosage, medicineName } = req.body;

        await mediCollection.insertOne({
            deviceToken,
            notifyAt,
            dosage,
            medicineName
        });

        res.json({ success: true, message: "Notification settings saved!" });
    } catch (error) {
        console.error("Error saving settings:", error);
        res.status(500).json({ success: false, message: "Error saving settings", error });
    }
});

// Get scheduled notifications
router.get("/get-scheduled-notification", async (req, res) => {
    try {
        const mediCollection = req.app.get("mediCollection");
        const { deviceToken } = req.query; // Fetch deviceToken from query params

        if (!deviceToken) {
            return res.status(400).json({ success: false, message: "Missing deviceToken parameter" });
        }

        const notifications = await mediCollection.find({ deviceToken }).toArray();

        res.json({ success: true, notifications });
    } catch (error) {
        console.error("Error fetching scheduled notifications:", error);
        res.status(500).json({ success: false, message: "Error fetching notifications", error });
    }
});

// 📌 Update FCM Token Route
router.post("/update-token", async (req, res) => {
    try {
        const { oldToken, newToken } = req.body;

        if (!oldToken || !newToken) {
            console.error("❌ Missing required fields:", { oldToken, newToken });
            return res.status(400).json({ message: "Both oldToken and newToken are required" });
        }

        // Get the database references for collections that store FCM tokens
        const mediCollection = req.app.get("mediCollection"); // Main collection
        const notifyCollection = req.app.get("notifyCollection"); // User data collection
    
        if (!mediCollection || !notifyCollection ) {
            console.error("❌ Database connection error!");
            return res.status(500).json({ message: "Database connection error!" });
        }

        // Update all occurrences of oldToken to newToken in all collections
        const mediUpdate = await mediCollection.updateMany(
            { deviceToken: oldToken },
            { $set: { deviceToken: newToken } }
        );

        const notifyUpdate = await notifyCollection.updateMany(
            { fcmToken: oldToken },
            { $set: { fcmToken: newToken } }
        );

      

        console.log("🔄 FCM Token Updated in Collections:", {
            mediUpdates: mediUpdate.modifiedCount,
            usersUpdated: notifyUpdate.modifiedCount
        });

        res.status(200).json({
            message: "FCM Token updated successfully in all collections",
            updatedCounts: {
                mediCollection: mediUpdate.modifiedCount,
                notified: notifyUpdate.modifiedCount,
               
            }
        });

    } catch (error) {
        console.error("❌ Error updating FCM token:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


module.exports = router;