const admin = require("firebase-admin");
require("dotenv").config();
// Check if environment variable is set
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error("❌ GOOGLE_APPLICATION_CREDENTIALS is not set!");
    process.exit(1); // Stop execution
}

// Load service account
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log("✅ Service Account Loaded:", serviceAccount ? "Success" : "Failed");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

console.log("🚀 Firebase Admin Initialized Successfully!");

module.exports = admin;
