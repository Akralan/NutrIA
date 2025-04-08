import api from './api';

const mealService = {
  // Récupérer tous les repas
  getAllMeals: async () => {
    try {
      const response = await api.get('/meals');
      return response.data;
    } catch (error) {
      console.error('Error fetching meals:', error);
      throw error;
    }
  },

  // Récupérer un repas par son ID
  getMealById: async (id) => {
    try {
      const response = await api.get(`/meals/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching meal with id ${id}:`, error);
      throw error;
    }
  },

  // Ajouter un nouveau repas
  addMeal: async (mealData) => {
    try {
      const response = await api.post('/meals', mealData);
      return response.data;
    } catch (error) {
      console.error('Error adding meal:', error);
      throw error;
    }
  },

  // Mettre à jour un repas
  updateMeal: async (id, mealData) => {
    try {
      const response = await api.put(`/meals/${id}`, mealData);
      return response.data;
    } catch (error) {
      console.error(`Error updating meal with id ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un repas
  deleteMeal: async (id) => {
    try {
      const response = await api.delete(`/meals/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting meal with id ${id}:`, error);
      throw error;
    }
  }
};

export default mealService;
