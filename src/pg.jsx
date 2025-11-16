import React, { useState, useEffect } from "react";
import "./pg.css";

function PG({ user, setPage }) {
  const [activeTab, setActiveTab] = useState("add");
  const [feedbackList, setFeedbackList] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  const [pgName, setPgName] = useState("");
  const [address, setAddress] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState({});  

  // Load feedback + questions from backend
  useEffect(() => {
    fetchFeedback();
    fetchQuestions();
  }, []);

  const fetchFeedback = async () => {
    const res = await fetch("http://localhost:5000/api/pg/feedback");
    const data = await res.json();
    setFeedbackList(data);
  };

  const fetchQuestions = async () => {
    const res = await fetch("http://localhost:5000/api/pg/questions");
    const data = await res.json();
    setQuestionList(data);
  };

  const handleAddFeedback = async () => {
    if (!pgName || !address || !feedback || !rating) {
      alert("Please fill all details!");
      return;
    }

    const newFeedback = {
      pgName,
      address,
      feedback,
      rating,
      username: user.username,
    };

    const res = await fetch("http://localhost:5000/api/pg/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeedback),
    });

    if (res.ok) {
      alert("Feedback Added!");
      fetchFeedback();
      setPgName("");
      setAddress("");
      setFeedback("");
      setRating("");
    } else {
      alert("Error adding feedback");
    }
  };

  const handleAskQuestion = async () => {
    if (!question) {
      alert("Enter a question");
      return;
    }

    const newQuestion = {
      question,
      askedBy: user.username,
    };

    const res = await fetch("http://localhost:5000/api/pg/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    });

    if (res.ok) {
      alert("Question posted!");
      fetchQuestions();
      setQuestion("");
    }
  };

  const handleAddAnswer = async (id) => {
    const currentAnswer = answers[id] || ""; 
    
    if (!currentAnswer) {
      alert("Write an answer");
      return;
    }

    const res = await fetch(`http://localhost:5000/api/pg/questions/${id}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answer: currentAnswer,  
        answeredBy: user.username,
      }),
    });

    if (res.ok) {
      alert("Answer added!");
      fetchQuestions();
      setAnswers({ ...answers, [id]: "" });  
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }
  
    const res = await fetch(`http://localhost:5000/api/pg/feedback/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username }),
    });
  
    const data = await res.json();
    
    if (data.success) {
      alert("Feedback deleted!");
      fetchFeedback();
    } else {
      alert(data.message || "Error deleting feedback");
    }
  };
  
  const handleDeleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }
  
    const res = await fetch(`http://localhost:5000/api/pg/questions/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username }),
    });
  
    const data = await res.json();
    
    if (data.success) {
      alert("Question deleted!");
      fetchQuestions();
    } else {
      alert(data.message || "Error deleting question");
    }
  };
  
  return (
    <div className="pg-container">
      <button className="back-btn" onClick={() => setPage("welcome")}>⬅ Back</button>

      <h1 className="pg-title">PG / Hostel Information</h1>

      <div className="pg-options">
        <button onClick={() => setActiveTab("add")} className={activeTab === "add" ? "active" : ""}>Add Feedback</button>
        <button onClick={() => setActiveTab("see")} className={activeTab === "see" ? "active" : ""}>See Feedback</button>
        <button onClick={() => setActiveTab("ask")} className={activeTab === "ask" ? "active" : ""}>Ask a Question</button>
      </div>

      {activeTab === "add" && (
        <div className="section">
          <h2>Add Feedback</h2>

          <input type="text" placeholder="PG Name" value={pgName} onChange={(e) => setPgName(e.target.value)} />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

          <textarea
            placeholder="Write feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>

          <input type="number" placeholder="Rating (1-5)" value={rating} onChange={(e) => setRating(e.target.value)} />

          <button onClick={handleAddFeedback}>Submit</button>
        </div>
      )}

      {activeTab === "see" && (
        <div className="section">
          <h2>Feedback</h2>

          {feedbackList.length === 0 ? <p>No feedback yet.</p> : (
            feedbackList.map((item) => (
              <div key={item._id} className="feedback-box">
                <h3>{item.pgName}</h3>
                <p><strong>Address:</strong> {item.address}</p>
                <p><strong>Rating:</strong> {item.rating} </p>
                <p>{item.feedback}</p>
                <p className="username">— {item.username}</p>
                {user.username === item.username && (
                  <button 
                    onClick={() => handleDeleteFeedback(item._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "ask" && (
        <div className="section">
          <h2>Ask a Question</h2>

          <textarea placeholder="Type question" value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>

          <button onClick={handleAskQuestion}>Post</button>

          <h3>Questions</h3>

          {questionList.length === 0 ? <p>No questions yet.</p> : (
            questionList.map((q) => (
              <div key={q._id} className="question-box">
                <p><strong>Q:</strong> {q.question}</p>
                <p className="username">— asked by {q.askedBy}</p>

                {user.username === q.askedBy && (
                  <button 
                    onClick={() => handleDeleteQuestion(q._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                )}

                {q.answer ? (
                  <div className="answer">
                    <p><strong>Answer:</strong> {q.answer}</p>
                    <p className="username">— {q.answeredBy}</p>
                  </div>
                ) : (
                  <>
                    <textarea
                      placeholder="Write answer"
                      value={answers[q._id] || ""}  
                      onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}  
                    ></textarea>
                    <button onClick={() => handleAddAnswer(q._id)}>Submit Answer</button>
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

export default PG;