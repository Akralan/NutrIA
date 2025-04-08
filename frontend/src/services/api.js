import axios from 'axios';

// Création d'une instance axios avec une configuration de base
const api = axios.create({
  baseURL: '/api', // Utilisera le proxy configuré dans package.json
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
