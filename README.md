# IgniteBuddy - MERN Stack Application

A full-stack web application for trainees to share information about PGs, Restaurants, and Hospitals.

## Features

- 🔐 User Authentication (Register/Login)
- 🏠 PG/Hostel Information with Feedback
- 🍽️ Restaurant Information
- 🏥 Hospital Information
- 💬 Q&A System for PG Information
- 🗑️ Delete own content (permissions-based)

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

## GitHub Upload Instructions

### Option 1: Using the Batch File (Windows)
1. Double-click `upload-to-github.bat`
2. Follow the prompts

### Option 2: Manual Upload via Command Line

Open Git Bash or Command Prompt in this directory and run:

```bash
# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/Suryansh9142/Ignite-Project.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: IgniteBuddy MERN Stack Application"

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Option 3: Using GitHub Desktop
1. Open GitHub Desktop
2. File → Add Local Repository
3. Select this folder
4. Click "Publish repository"
5. Enter repository name: `Ignite-Project`
6. Click "Publish Repository"

## Environment Variables

Create a `.env` file in the `backend` folder:
```
MONGODB_URI=your_mongodb_connection_string
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

