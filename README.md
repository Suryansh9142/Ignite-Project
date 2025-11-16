# IgniteBuddy - MERN Stack Application

A full-stack web application for trainees to share information about PGs, Restaurants, and Hospitals.

## Features

- User Authentication (Register/Login)
- PG/Hostel Information with Feedback
- Restaurant Information
- Hospital Information
- Q&A System for PG Information
- Delete own content (permissions-based)

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Styling:** CSS

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
npm install
npm run dev
```

### Run Both Together
```bash
npm start
```

## Project Structure

```
MERN/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Feedback.js
│   │   └── Question.js
│   └── server.cjs
├── src/
│   ├── App.jsx
│   ├── home.jsx
│   ├── login.jsx
│   ├── register.jsx
│   ├── welcome.jsx
│   ├── pg.jsx
│   ├── Hospital.jsx
│   └── Restaurant.jsx
└── package.json
```

## License

© 2025 IgniteBuddy. All rights reserved.

