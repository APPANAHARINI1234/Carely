const express = require("express");
const { ObjectId } = require("mongodb"); // For handling MongoDB ObjectIDs
const router = express.Router();



router.post("/store-notification", async (req, res) => {
    try {
        const { title, body, fcmToken, datetime } = req.body;

        if (!title || !body || !fcmToken) {
            console.error("❌ Missing required fields:", { title, body, fcmToken, datetime });
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Get the correct database reference
        const db = req.app.get("notifyCollection");

        if (!db) {
            console.error("❌ Database connection is missing.");
            return res.status(500).json({ message: "Database connection error" });
        }

        await db.insertOne({ title, body, fcmToken, datetime });

        console.log("✅ Notification stored:", { title, body, datetime });
        res.status(200).json({ message: "Notification stored successfully" });

    } catch (error) {
        console.error("❌ Error storing notification:", error.stack);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


router.get("/get-notifications", async (req, res) => {
    try {
        const mediNotify = req.app.get("notifyCollection");

        if (!mediNotify) {
            console.error("❌ Database connection error!");
            return res.status(500).json({ success: false, message: "Database connection error!" });
        }

        const { fsm } = req.query;
        console.log("🔍 Received FSM token:", fsm); // Debugging

        if (!fsm) {
            console.warn("⚠️ Missing FCM token in request!");
            return res.status(400).json({ success: false, message: "FCM token is required!" });
        }

        // Fetch notifications where fcmToken matches and sort by timestamp (latest first)
        const notifications = await mediNotify
            .find({ fcmToken: fsm })
            .toArray();

        // Convert datetime strings to Date objects for proper sorting
        notifications.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

        console.log("✅ Notifications fetched:", notifications.length);
        res.json({ success: true, notifications });

    } catch (error) {
        console.error("❌ Error fetching notifications:", error);
        res.status(500).json({ success: false, message: "Error fetching notifications", error: error.message });
    }
});

module.exports = router;