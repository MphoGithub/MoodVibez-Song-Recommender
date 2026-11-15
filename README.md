# MoodVibez - Song Recommender 🎵

MoodVibez is a full-stack music recommendation app that suggests songs based on a user’s mood and chosen Southern African region. It combines a Node.js/Express backend with a React + Vite frontend to deliver a sleek, user-friendly music discovery experience.

## ✨ Features

- Mood-based song suggestions using Google Gemini AI
- Country/region-aware recommendations for Southern Africa
- User registration and login with JWT authentication
- Protected user profile management
- Rate limiting for API security
- Responsive modern frontend with Tailwind CSS and DaisyUI

## 🛠️ Tech Stack

- MongoDB
- Express.js
- Node.js
- React 19
- Vite
- Tailwind CSS
- DaisyUI
- JWT
- bcryptjs
- dotenv
- CORS
- Axios
- React Router
- React Hot Toast
- Google Generative AI (@google/genai)

## 📁 Project Structure

```bash
MoodVibez-Song-Recommender/
├── backend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── README.md
├── .gitignore
├── LICENSE
└── package.json
```

## 🚀 Setup

### 1. Clone the repository

```bash
git clone https://github.com/MphoGithub/MoodVibez-Song-Recommender.git
cd MoodVibez-Song-Recommender
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The backend runs on:

```bash
http://localhost:8000
```

### 3. Frontend setup

Open a new terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```bash
http://localhost:5173
```

## 🔐 Environment Variables

Create a `.env` file in the backend using the example template and fill in the required values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
GEMINI_API_KEY=your_google_gemini_api_key
```

## 🧪 Scripts

### Backend

```bash
npm run dev
```
Starts the Express API with nodemon.

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 👤 Author

**Mpho**

