const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const axios = require("axios");

// ✅ Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ Environment Variables
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.GEMINI_API_KEY;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || "Carely";

require("dotenv").config();
console.log("Mongo URL:", process.env.MONGO_URL);
console.log("Firebase Credentials:", process.env.GOOGLE_APPLICATION_CREDENTIALS);


// ✅ API URL (Fixed Interpolation)
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

console.log("Loaded API Key:", API_KEY ? "YES" : "NO");

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Server is running. Use /chat?message=your-message to chat.");
});

// ✅ Chatbot API Route
app.get("/chat", async (req, res) => {
  const userMessage = req.query.message;
  const language = req.query.language || "English"; // Default to English

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // ✅ Improved prompt to force JSON output
    const prompt = `The user says: "${userMessage}" in ${language}.
    
    Return ONLY the following JSON structure:
    {
      "possibleConditions": ["List of possible conditions"],
      "earlySigns": "Description of early signs",
      "causes": "Brief explanation of causes",
      "remedies": ["List of remedies"],
      "yogaTips": "Yoga exercises that can help",
      "precautions": "Precautions to follow"
    }

    Strictly return ONLY the JSON object. No extra text, explanation, or formatting.
    `;

    // ✅ API Call
    const response = await axios.post(
      API_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const rawReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("Raw Gemini reply:", rawReply);

    if (!rawReply) {
      return res.status(500).json({ error: "No reply from Gemini API" });
    }

    // ✅ Extract JSON from response using regex (removes extra characters)
    const jsonMatch = rawReply.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      throw new Error("Response does not contain valid JSON");
    }

    const cleanedReply = jsonMatch[0];
    const structuredResponse = JSON.parse(cleanedReply);

    res.json(structuredResponse);
  } catch (error) {
    console.error("Gemini API error:", error.response ? error.response.data : error.message);
    
    // ✅ Return a fallback error message instead of crashing
    res.status(500).json({
      error: "Failed to fetch chatbot response. Please try again later.",
    });
  }
});

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "https://carely-health.vercel.app",
  "https://carely-health-7zfg.onrender.com"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Importing API Routes
const userApp = require("./API/userAPI");
const mediApp = require("./API/medicineAPI");
const notifyApp = require("./API/mediNotification");

// ✅ Register Routes
app.use("/user-api", userApp);
app.use("/api", mediApp);
app.use("/notify", notifyApp);

// ✅ MongoDB Connection
const mongoclient = new MongoClient(MONGO_URL);

mongoclient
  .connect()
  .then((connectionObj) => {
    console.log("✅ DB CONNECTION SUCCESS!");

    // ✅ Database & Collections
    const db = connectionObj.db(DB_NAME);
    const exploreCollection = db.collection("Explore");
    const healthTipsCollection = db.collection("healthTips");
    const usersCollection = db.collection("Users");
    const mediCollection = db.collection("mediNotify");
    const notifyCollection = db.collection("notifications");

    if (!exploreCollection || !healthTipsCollection) {
      throw new Error("❌ Collections not found in the database!");
    }

    // ✅ Set collections for other routes
    app.set("usersCollection", usersCollection);
    app.set("mediCollection", mediCollection);
    app.set("notifyCollection", notifyCollection);

    // ✅ Load Explore API
    const exploreRouter = require("./API/explore")(exploreCollection, healthTipsCollection);
    app.use("/api/explore", exploreRouter);

    // ✅ Start Server
    app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
    require("./cronJobs")
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
    process.exit(1); // Stop server if DB connection fails
  });

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});
