import api from './api';

const assistantService = {
  // Créer un nouveau thread de conversation
  createThread: async () => {
    try {
      const response = await api.post('/assistant/threads');
      return response.data;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  },

  // Envoyer un message à l'assistant
  sendMessage: async (threadId, message) => {
    try {
      const response = await api.post('/assistant/messages', {
        threadId,
        message
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Récupérer les messages d'un thread
  getMessages: async (threadId) => {
    try {
      const response = await api.get(`/assistant/threads/${threadId}/messages`);
      return response.data;
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  }
};

export default assistantService;
