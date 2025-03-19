const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config(); // Load variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// Debug: Check if API key is loaded
console.log("Loaded API Key:", API_KEY ? "YES" : "NO");

// Root route for testing
app.get("/", (req, res) => {
  res.send("Server is running. Use /chat?message=your-message&language=your-language");
});

// Chatbot API Route with language support
app.get("/chat", async (req, res) => {
  const userMessage = req.query.message;
  const language = req.query.language || "English"; // Default language is English

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Construct the prompt for Gemini API
    const prompt = `The user says: "${userMessage}" in ${language}.
Provide a detailed health analysis in pure JSON format with these keys:
{
  "possibleConditions": [array of possible conditions],
  "earlySigns": "string describing early signs",
  "causes": "string describing causes",
  "remedies": [array of recommended remedies],
  "yogaTips": "string with yoga tips",
  "precautions": "string with precautions"
}
Respond in ${language} and return ONLY the JSON object.`;

    const response = await axios.post(
      API_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // Extract and clean the Gemini API response
    const rawReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Raw Gemini reply:", rawReply);

    if (!rawReply) {
      return res.status(500).json({ error: "No reply from Gemini API" });
    }

    // Remove markdown delimiters and parse JSON
    const cleanedReply = rawReply.replace(/^```json\s*|\s*```$/g, "").trim();
    let structuredResponse;

    try {
      structuredResponse = JSON.parse(cleanedReply);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Cleaned reply:", cleanedReply);
      return res.status(500).json({ error: "Invalid response format from Gemini API" });
    }

    res.json(structuredResponse);
  } catch (error) {
    console.error("Gemini API error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch chatbot response" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
