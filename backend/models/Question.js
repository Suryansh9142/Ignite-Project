const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  askedBy: { type: String, required: true },
  answer: { type: String, default: null },
  answeredBy: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Question", QuestionSchema);