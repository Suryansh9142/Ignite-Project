const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  pgName: { type: String, required: true },
  address: { type: String, required: true },
  feedback: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  username: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", FeedbackSchema);