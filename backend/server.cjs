const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Feedback = require("./models/Feedback");
const Question = require("./models/Question");

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = "mongodb+srv://suryanshmishra003_db_user:Sm%406206649651@reactapp.xvyewl7.mongodb.net/igniteBuddy?retryWrites=true&w=majority&appName=ReactApp";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log("MongoDB Connection Failed:", err.message));

const User = require("./models/User");

// Root route
app.get("/", (req, res) => {
  res.send("IgniteBuddy Server is Running!");
});

// REGISTER API
app.post("/api/register", async (req, res) => {
  try {
    console.log("Register request received:", req.body);
    const { username, empId, batch, password } = req.body;

    if (!username || !empId || !batch || !password) {
      console.log("Missing fields");
      return res.json({ success: false, message: "Missing fields" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Username already taken");
      return res.json({ success: false, message: "Username already taken" });
    }

    await User.create({ username, empId, batch, password });
    console.log("User registered successfully");
    res.json({ success: true, message: "Registered successfully" });

  } catch (err) {
    console.log("Error in register:", err);
    res.json({ success: false, message: "Server error: " + err.message });
  }
});

// LOGIN API
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" }); 
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    res.json({ 
      success: true, 
      message: "Logged in successfully",
      user: { username: user.username, empId: user.empId, batch: user.batch }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Static lists for PG/Restaurant/Hospital

let pgList = [
  { name: "Green View PG", location: "Hyderabad" },
  { name: "Comfort Stay PG", location: "Bangalore" }
];

let restaurantList = [
  { name: "Spicy Grill", location: "Hyderabad" },
  { name: "Food Hub", location: "Chennai" }
];

let hospitalList = [
  { name: "City Hospital", location: "Hyderabad" },
  { name: "Global Care", location: "Bangalore" }
];

app.get("/api/pg", (req, res) => {
  res.json(pgList);
});

app.get("/api/restaurants", (req, res) => {
  res.json(restaurantList);
});

app.get("/api/hospitals", (req, res) => {
  res.json(hospitalList);
});


// FEEDBACK APIs

// GET all feedback
app.get("/api/pg/feedback", async (req, res) => {
  try {
    console.log("GET /api/pg/feedback - Fetching feedback from MongoDB...");
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    console.log(`Found ${feedbacks.length} feedbacks`);
    res.json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ success: false, message: "Error fetching feedback" });
  }
});

// POST new feedback
app.post("/api/pg/feedback", async (req, res) => {
  try {
    console.log("POST /api/pg/feedback - Received data:", req.body);
    const { pgName, address, feedback, rating, username } = req.body;
    
    const newFeedback = await Feedback.create({
      pgName,
      address,
      feedback,
      rating,
      username
    });
    
    console.log("Feedback saved to MongoDB:", newFeedback._id);
    res.json({ success: true, feedback: newFeedback });
  } catch (err) {
    console.error("Error adding feedback:", err);
    res.status(500).json({ success: false, message: "Error adding feedback" });
  }
});

// DELETE feedback (only by creator)
app.delete("/api/pg/feedback/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    
    console.log(`DELETE feedback ${id} by ${username}`);
    
    const feedback = await Feedback.findById(id);
    
    if (!feedback) {
      return res.status(404).json({ success: false, message: "Feedback not found" });
    }
    
    if (feedback.username !== username) {
      return res.status(403).json({ success: false, message: "You can only delete your own feedback" });
    }
    
    await Feedback.findByIdAndDelete(id);
    console.log("Feedback deleted");
    res.json({ success: true, message: "Feedback deleted" });
  } catch (err) {
    console.error("Error deleting feedback:", err);
    res.status(500).json({ success: false, message: "Error deleting feedback" });
  }
});

// QUESTION APIs 

// GET all questions
app.get("/api/pg/questions", async (req, res) => {
  try {
    console.log("GET /api/pg/questions - Fetching questions from MongoDB...");
    const questions = await Question.find().sort({ createdAt: -1 });
    console.log(`Found ${questions.length} questions`);
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ success: false, message: "Error fetching questions" });
  }
});

// POST new question
app.post("/api/pg/questions", async (req, res) => {
  try {
    console.log("POST /api/pg/questions - Received data:", req.body);
    const { question, askedBy } = req.body;
    
    const newQuestion = await Question.create({
      question,
      askedBy
    });
    
    console.log("Question saved to MongoDB:", newQuestion._id);
    res.json({ success: true, question: newQuestion });
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ success: false, message: "Error adding question" });
  }
});

// POST answer to question
app.post("/api/pg/questions/:id/answer", async (req, res) => {
  try {
    const { id } = req.params;
    const { answer, answeredBy } = req.body;
    
    console.log(`Adding Answer to Question ${id} by ${answeredBy}`);
    
    const question = await Question.findByIdAndUpdate(
      id,
      { answer, answeredBy },
      { new: true }
    );
    
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    
    console.log("Answer saved");
    res.json({ success: true, question });
  } catch (err) {
    console.error("Error adding answer:", err);
    res.status(500).json({ success: false, message: "Error adding answer" });
  }
});

// DELETE question (only by creator)
app.delete("/api/pg/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    
    console.log(`DELETE Question ${id} by ${username}`);
    
    const question = await Question.findById(id);
    
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    
    if (question.askedBy !== username) {
      return res.status(403).json({ success: false, message: "You can only delete your own questions" });
    }
    
    await Question.findByIdAndDelete(id);
    console.log("Question deleted");
    res.json({ success: true, message: "Question deleted" });
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).json({ success: false, message: "Error deleting question" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));