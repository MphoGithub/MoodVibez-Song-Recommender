# MoodVibez - Song Recommender 🎵

A full-stack web app that recommends music based on your mood and region. Pick how you feel, choose a Southern African country, and MoodVibez uses **Google Gemini AI** to suggest 10 matching songs.

## ✨ Features

- **Mood-based recommendations** — Choose from 7 moods and get 10 AI-generated song suggestions
- **Regional focus** — Recommendations tailored to music popular in Southern Africa
- **User authentication** — Register, log in, and access protected routes with JWT
- **User profiles** — View and update your profile
- **Rate limiting** — Protects auth and recommendation endpoints from abuse

## 🛠️ Tech Stack

- **MongoDB**
- **Express** 
- **React 19**
- **Node.JS**
- **Vite** – Fast development and build tool
- **Tailwind CSS** 
- **DaisyUI**
- **JWT** – for secure authentication
- **bcryptjs** – for password hashing
- **CORS & dotenv** – for security and environment variables
- **Google Generative AI** (@google/genai) – for smart music recommendations
- **Axios** – For making API requests
- **React Router** – For navigation
- **React Hot Toast** – For notifications

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/MphoGithub/MoodVibez-Song-Recommender.git
cd MoodVibez-Song-Recommender
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Copy `.env.example` to `.env` and fill in your credentials.

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Author

**Mpho**



