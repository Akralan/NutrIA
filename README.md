# 🥗 NutrIA - Votre Assistant Nutritionnel Intelligent

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5+-green.svg)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-v18+-blue.svg)](https://reactjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-orange.svg)](https://openai.com/)

NutrIA est une application complète de suivi nutritionnel et de bien-être, combinant une interface utilisateur moderne avec un assistant IA intelligent pour vous aider à atteindre vos objectifs de santé.

## ✨ Fonctionnalités

- 🤖 **Assistant IA Nutritionnel** - Analyse intelligente de vos repas et conseils personnalisés
- 📊 **Suivi des Repas** - Enregistrement et analyse de votre alimentation quotidienne
- 💪 **Gestion des Exercices** - Suivi de vos activités physiques
- 🎯 **Objectifs Personnalisés** - Définition et suivi de vos objectifs de santé
- 😴 **Suivi du Sommeil** - Monitoring de la qualité de votre repos
- 💡 **Conseils Personnalisés** - Tips adaptés à votre profil et vos objectifs

## 🏗️ Architecture

### Frontend (React)
```
frontend/
├── src/
│   ├── components/
│   │   ├── assistant/    # Interface de chat IA
│   │   ├── common/       # Composants réutilisables
│   │   ├── exercises/    # Gestion des exercices
│   │   └── meals/        # Gestion des repas
│   ├── contexts/         # Contextes React
│   ├── pages/           # Pages principales
│   └── services/        # Services API
```

### Backend (Node.js + Express)
```
├── models/              # Modèles MongoDB
├── routes/             # Routes API
├── services/           # Logique métier
└── server.js           # Point d'entrée
```

## 🚀 Démarrage Rapide

### Prérequis

- Node.js (v18 ou supérieur)
- MongoDB (v5 ou supérieur)
- npm ou yarn
- Compte OpenAI avec clé API

### Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/nutria.git
   cd nutria
   ```

2. **Installer les dépendances**
   ```bash
   # Backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

3. **Configuration**
   
   Créer un fichier `.env` à la racine :
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/nutria
   OPENAI_API_KEY=votre_clé_api
   OPENAI_ASSISTANT_ID=votre_assistant_id
   ```

4. **Lancer l'application**
   ```bash
   # Terminal 1 - Backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

L'application sera accessible sur :
- Frontend : http://localhost:3000
- Backend API : http://localhost:3001

## 🔌 API Endpoints

### Assistant IA
- `POST /api/assistant/threads` - Créer une nouvelle conversation
- `POST /api/assistant/messages` - Envoyer un message
- `GET /api/assistant/threads/:threadId/messages` - Historique des messages

### Repas
- `GET /api/meals` - Liste des repas
- `POST /api/meals` - Ajouter un repas
- `PUT /api/meals/:id` - Modifier un repas
- `DELETE /api/meals/:id` - Supprimer un repas

### Exercices
- `GET /api/exercises` - Liste des exercices
- `POST /api/exercises` - Ajouter un exercice
- `PUT /api/exercises/:id` - Modifier un exercice
- `DELETE /api/exercises/:id` - Supprimer un exercice

## 🧪 Tests

```bash
# Exécuter les tests
npm test

# Mode watch
npm run test:watch

# Couverture de code
npm run test:coverage
```

## 🛠️ Technologies Utilisées

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

Ce projet est sous licence Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC 4.0). Cette licence permet la modification et la distribution du code, mais interdit toute utilisation commerciale. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- OpenAI pour leur API d'assistant
- La communauté open source pour les nombreuses bibliothèques utilisées
- Tous les contributeurs du projet

---

Développé avec ❤️ par Akralan
