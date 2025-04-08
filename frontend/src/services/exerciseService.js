import api from './api';

const exerciseService = {
  // Récupérer tous les exercices
  getAllExercises: async (type = null) => {
    try {
      const params = type ? { type } : {};
      const response = await api.get('/exercises', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw error;
    }
  },

  // Récupérer un exercice par son ID
  getExerciseById: async (id) => {
    try {
      const response = await api.get(`/exercises/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching exercise with id ${id}:`, error);
      throw error;
    }
  },

  // Ajouter un nouvel exercice
  addExercise: async (exerciseData) => {
    try {
      const response = await api.post('/exercises', exerciseData);
      return response.data;
    } catch (error) {
      console.error('Error adding exercise:', error);
      throw error;
    }
  },

  // Mettre à jour un exercice
  updateExercise: async (id, exerciseData) => {
    try {
      const response = await api.put(`/exercises/${id}`, exerciseData);
      return response.data;
    } catch (error) {
      console.error(`Error updating exercise with id ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un exercice
  deleteExercise: async (id) => {
    try {
      const response = await api.delete(`/exercises/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting exercise with id ${id}:`, error);
      throw error;
    }
  }
};

export default exerciseService;
