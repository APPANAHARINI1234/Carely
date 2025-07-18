const cron = require("node-cron");
const { MongoClient } = require("mongodb");
const admin = require("./firebaseAdmin");
require("dotenv").config();

// MongoDB connection string
const uri = process.env.MONGO_URL;
console.log(uri)
let db; // Store database connection globally

// Connect to MongoDB once and reuse the connection
async function connectToDatabase() {
    try {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await client.connect();
        db = client.db("Carely"); // Select the correct database
        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
}

// Function to send push notifications
async function sendPushNotification(userToken, medicineName, medicineDosage) {
    const message = {
        notification: {
            title: "🌟 Time for Your Medicine! 🌟",
            body: `Hey there! 😊 It's time to take your ${medicineName}. Don't forget your dosage: ${medicineDosage}. Stay healthy and happy! 💊💖`,
        },
        token: userToken,
    };
    console.log("🔔 New Notification Received:");

    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST Offset in milliseconds
    const istDate = new Date(now.getTime() + istOffset);

    const notificationData = {
        title:  "🌟 Time for Your Medicine! 🌟",
        body: `Hey there! 😊 It's time to take your ${medicineName}. Don't forget your dosage: ${medicineDosage}. Stay healthy and happy! 💊💖`,
        fcmToken: userToken, 
        datetime: istDate.toISOString().slice(0, 16) 
    };

    console.log("📦 Sending Notification Data to Backend:", notificationData);
   

    // Send to backend
    try {
        const response = await fetch("https://carely-health-7zfg.onrender.com/notify/store-notification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(notificationData),
        });

        if (response.ok) {
            console.log("✅ Notification stored in backend");
        } else {
            console.error("❌ Failed to store notification in backendddd.");
        }
    } catch (error) {
        console.error("❌ Error sending notification to backend:", error);
    }


   try {
    await admin.messaging().send(message);
    console.log(`✅ Notification sent successfully: ${medicineName} (${medicineDosage})`);
} catch (err) {
    console.error("❌ Error sending notification:", err);

    if (err.code === 'messaging/registration-token-not-registered') {
        console.warn(`🚫 Invalid token detected. Removing token: ${userToken}`);

        // Optionally, remove or unset the invalid token from your DB
        try {
            await db.collection("mediNotify").updateOne(
                { deviceToken: userToken },
                { $unset: { deviceToken: "" } }
            );
            console.log("🧹 Cleared invalid deviceToken from DB.");
        } catch (dbErr) {
            console.error("❌ Error updating DB to remove invalid token:", dbErr);
        }
    }
}

}

// Schedule task to run every minute
cron.schedule("*/1 * * * *", async () => {
    console.log("⏳ Running scheduled job...");

    if (!db) {
        console.error("❌ Database not connected. Retrying...");
        await connectToDatabase(); // Retry connection if lost
        return;
    }

    try {
        const collection = db.collection("mediNotify"); // Select collection

        // Get current time in "HH:mm" format
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, "0");
        const currentMinute = now.getMinutes().toString().padStart(2, "0");
        const currentTime = `${currentHour}:${currentMinute}`;

        console.log(`🔍 Checking reminders for ${currentTime}...`);

        // Fetch users with a matching notifyAt time
        const usersToNotify = await collection.find({ notifyAt: currentTime }).toArray();

        if (usersToNotify.length > 0) {
            console.log(`✅ Found ${usersToNotify.length} users to notify.`);

            // Send notifications
            for (const user of usersToNotify) {
                if (user.deviceToken && user.medicineName && user.dosage) {
                    await sendPushNotification(user.deviceToken, user.medicineName, user.dosage);
                } else {
                    console.warn(`⚠️ User ${user._id} is missing required details.`);
                }
            }
        } else {
            console.log("⚠️ No notifications scheduled at this time.");
        }
    } catch (error) {
        console.error("❌ Error fetching reminders:", error);
    }
});

// Connect to the database when the script starts
connectToDatabase();

module.exports = cron;
