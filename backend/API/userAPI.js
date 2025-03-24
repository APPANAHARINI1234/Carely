const exp = require("express");
const userApp = exp.Router();
const { Db } = require("mongodb");
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken'); 
const bodyParser = require("body-parser");
const cors = require("cors");







// Middleware setup
userApp.use(cors());
userApp.use(exp.json());
userApp.use(bodyParser.json());

// **User Registration**
userApp.post("/user", expressAsyncHandler(async (req, res) => {
    const usersCollection = req.app.get("usersCollection");
    let newUser = req.body;

    let existingUser = await usersCollection.findOne({ username: newUser.username });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    newUser.password = await bcryptjs.hash(newUser.password, 7);
    await usersCollection.insertOne(newUser);
    res.status(201).send({ message: "User created successfully" });
}));



// **User Login**
userApp.post("/login", expressAsyncHandler(async (req, res) => {
  const usersCollection = req.app.get("usersCollection");
  const { username, password } = req.body;

  const user = await usersCollection.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET , { expiresIn: '1h' });

  res.cookie("token", token, {
    httpOnly: true, 
    secure: true,   
    sameSite: "Strict", 
    maxAge: 60 * 60 * 1000, 
  });

  res.status(200).json({ message: "Login successful", user });
}));

module.exports = userApp;
