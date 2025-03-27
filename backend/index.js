const exp = require("express"); // Use only exp() for express app
const app = exp();
require("./cronJobs"); 
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
app.use(exp.json()); // This parses incoming JSON requests
app.use(exp.urlencoded({ extended: true })); // Optional: Supports URL-encoded bodies

const PORT = 5000;


// ✅ CORS Configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:5000","https://carely-health.vercel.app","https://carely-health-7zfg.onrender.com"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Import user routes before DB connection
const userApp = require("./API/userAPI");
const mediApp=require("./API/medicineAPI");
const notifyApp=require("./API/mediNotification");



// ✅ Pass collections correctly to explore.js


 
app.use("/user-api", userApp);
app.use("/api",mediApp)
app.use("/notify",notifyApp);
  // ✅ Ensure collections exist
  
// ✅ MongoDB Connection
const mongoclient = new MongoClient(process.env.MONGO_URL);
mongoclient
  .connect()
  .then((connectionObj) => {
    console.log("✅ DB CONNECTION SUCCESS!");

    // Connect to the database
    const db = connectionObj.db("Carely");
    const exploreCollection = db.collection("Explore");
      const healthTipsCollection = db.collection("healthTips");
    const exploreRouter = require("./API/explore")(exploreCollection, healthTipsCollection);
    app.use("/api/explore", exploreRouter);
    
    // Connect to collections
    const usersCollection = db.collection("Users");
    app.set("usersCollection",usersCollection);
    const mediCollection=db.collection("mediNotify")
    app.set("mediCollection",mediCollection);
    const notifyCollection=db.collection("notifications");
    app.set("notifyCollection",notifyCollection);
    
    if (!exploreCollection || !healthTipsCollection) {
      throw new Error("❌ Collections not found in the database!");
    }
    app.listen(PORT, () => console.log(`🚀 HTTP server started at port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Error in DB Connection:", err);
    process.exit(1); // Stop server if DB connection fails
  });

  
