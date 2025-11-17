import React, { useState } from "react";
import "./pg.css";

function Hospital({ user, setPage }) {
  const [activeTab, setActiveTab] = useState("add");
  const [feedbackList, setFeedbackList] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  const [hosName, setHosName] = useState("");
  const [address, setAddress] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAddFeedback = () => {
    if (!hosName || !address || !feedback || !rating) {
      alert("Please fill all details including address!");
      return;
    }

    const newFeedback = {
      hosName,
      address,
      feedback,
      rating,
      username: user.username,
    };

    setFeedbackList([...feedbackList, newFeedback]);
    setHosName("");
    setAddress("");
    setFeedback("");
    setRating("");
    alert("Feedback added!");
  };

  const handleAskQuestion = () => {
    if (!question) {
      alert("Please enter your question");
      return;
    }

    const newQuestion = {
      question,
      answer: "",
      askedBy: user.username,
    };

    setQuestionList([...questionList, newQuestion]);
    setQuestion("");
    alert("Question posted!");
  };

  const handleAddAnswer = (index) => {
    if (!answer) {
      alert("Please write an answer!");
      return;
    }

    const updated = [...questionList];
    updated[index].answer = answer;
    updated[index].answeredBy = user.username;

    setQuestionList(updated);
    setAnswer("");
  };

  return (
    <div className="pg-container">

      <button className="back-btn" onClick={() => setPage("welcome")}>⬅ Back</button>

      <h1 className="pg-title">Hospital Information</h1>

      <div className="pg-options">
        <button onClick={() => setActiveTab("add")} className={activeTab === "add" ? "active" : ""}>
          Add Feedback
        </button>

        <button onClick={() => setActiveTab("see")} className={activeTab === "see" ? "active" : ""}>
          See Feedback
        </button>

        <button onClick={() => setActiveTab("ask")} className={activeTab === "ask" ? "active" : ""}>
          Ask a Question
        </button>
      </div>

      {activeTab === "add" && (
        <div className="section">
          <h2>Add Feedback</h2>

          <input
            type="text"
            placeholder="Hospital Name"
            value={hosName}
            onChange={(e) => setHosName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <textarea
            placeholder="Write your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>

          <input
            type="number"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <button onClick={handleAddFeedback}>Submit Feedback</button>
        </div>
      )}

      {activeTab === "see" && (
        <div className="section">
          <h2>All Feedback</h2>

          {feedbackList.length === 0 ? (
            <p>No feedback yet.</p>
          ) : (
            feedbackList.map((item, index) => (
              <div key={index} className="feedback-box">
                <h3>{item.hosName}</h3>
                <p><strong>Address:</strong> {item.address}</p>
                <p><strong>Rating:</strong> {item.rating} ⭐</p>
                <p>{item.feedback}</p>
                <p className="username">— {item.username}</p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "ask" && (
        <div className="section">
          <h2>Ask a Question</h2>

          <textarea
            placeholder="Type your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>

          <button onClick={handleAskQuestion}>Post Question</button>

          <h3>Questions</h3>

          {questionList.length === 0 ? (
            <p>No questions yet.</p>
          ) : (
            questionList.map((q, index) => (
              <div key={index} className="question-box">
                <p><strong>Q:</strong> {q.question}</p>
                <p className="username">— asked by {q.askedBy}</p>

                {q.answer ? (
                  <div className="answer">
                    <p><strong>Answer:</strong> {q.answer}</p>
                    <p className="username">— {q.answeredBy}</p>
                  </div>
                ) : (
                  <>
                    <textarea
                      placeholder="Write answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>

                    <button onClick={() => handleAddAnswer(index)}>Submit Answer</button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}

export default Hospital;