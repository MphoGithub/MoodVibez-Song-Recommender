import api from "./api";

export const authService = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/users/profile/me');
        return response.data;
    },

    
    login: async (credentials) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    updateUserProfile: async (profileData) => {
        const response = await api.put('/users/profile/me', profileData);
        return response.data;
    },

    deleteUser: async() =>
    {
        const response = await api.delete('/auth/delete');
        return response.data;
    },

    getRecommendations: async (mood,region) => {
        const response = await api.post('/recommendations',
            {mood,region});
        return response.data;
    },
  }

export default authService;