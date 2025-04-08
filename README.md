# 🥗 NutrIA - Your Intelligent Nutrition Assistant

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5+-green.svg)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-v18+-blue.svg)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-orange.svg)](https://openai.com/)

NutrIA is a comprehensive nutrition and wellness tracking application, combining a modern user interface with an intelligent AI assistant to help you achieve your health goals.

## ✨ Features

- 🤖 **AI Nutrition Assistant** - Intelligent meal analysis and personalized advice
- 📊 **Meal Tracking** - Record and analyze your daily nutrition
- 💪 **Exercise Management** - Track your physical activities
- 🎯 **Custom Goals** - Set and track your health objectives
- 😴 **Sleep Tracking** - Monitor your rest quality
- 💡 **Personalized Tips** - Tips adapted to your profile and goals

## 🏗️ Architecture

### Frontend (React)
```
frontend/
├── src/
│   ├── components/
│   │   ├── assistant/    # AI chat interface
│   │   ├── common/       # Reusable components
│   │   ├── exercises/    # Exercise management
│   │   └── meals/        # Meal management
│   ├── contexts/         # React contexts
│   ├── pages/           # Main pages
│   └── services/        # API services
```

### Backend (Node.js + Express)
```
├── models/              # MongoDB models
├── routes/             # API routes
├── services/           # Business logic
└── server.js           # Entry point
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn
- OpenAI account with API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nutria.git
   cd nutria
   ```

2. **Install dependencies**
   ```bash
   # Backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

3. **Configuration**
   
   Create a `.env` file at the root:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/nutria
   OPENAI_API_KEY=your_api_key
   OPENAI_ASSISTANT_ID=your_assistant_id
   ```

4. **Launch the application**
   ```bash
   # Terminal 1 - Backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

The application will be accessible at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 🔌 API Endpoints

### AI Assistant
- `POST /api/assistant/threads` - Create a new conversation
- `POST /api/assistant/messages` - Send a message
- `GET /api/assistant/threads/:threadId/messages` - Message history

### Meals
- `GET /api/meals` - List meals
- `POST /api/meals` - Add a meal
- `PUT /api/meals/:id` - Update a meal
- `DELETE /api/meals/:id` - Delete a meal

### Exercises
- `GET /api/exercises` - List exercises
- `POST /api/exercises` - Add an exercise
- `PUT /api/exercises/:id` - Update an exercise
- `DELETE /api/exercises/:id` - Delete an exercise

## 🧪 Tests

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Code coverage
npm run test:coverage
```

## 🛠️ Technologies Used

- **Frontend**
  - React 18+
  - React Router
  - Axios
  - Material-UI

- **Backend**
  - Node.js
  - Express
  - MongoDB & Mongoose
  - OpenAI API
  - Jest (Tests)
  - Express Validator

## 📝 License

This project is licensed under Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0). This license allows modification and distribution of the code but prohibits any commercial use. See the `LICENSE` file for more details.

## 🙏 Acknowledgments

- OpenAI for their assistant API
- The open source community for the many libraries used
- All project contributors

---

Developed with ❤️ by Akralan
