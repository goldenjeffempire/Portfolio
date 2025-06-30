
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? 'http://0.0.0.0:8000/api' : '/api');

import axios from 'axios';

// Create axios instance with proper configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add CSRF token if available
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value;
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with retry logic
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    
    // Retry logic for network errors
    if (!response && !config._retry) {
      config._retry = true;
      config._retryCount = (config._retryCount || 0) + 1;
      
      if (config._retryCount <= 3) {
        await new Promise(resolve => setTimeout(resolve, 1000 * config._retryCount));
        return api(config);
      }
    }
    
    return Promise.reject(error);
  }
);

// Portfolio API methods
export const portfolioAPI = {
  // Get all portfolio data
  getPortfolioData: async () => {
    try {
      const response = await api.get('/portfolio/');
      return response.data;
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      throw new Error('Failed to load portfolio data. Please try again later.');
    }
  },

  // Get specific sections
  getProjects: async () => {
    try {
      const response = await api.get('/portfolio/projects/');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },

  getSkills: async () => {
    try {
      const response = await api.get('/portfolio/skills/');
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  },

  getExperience: async () => {
    try {
      const response = await api.get('/portfolio/experience/');
      return response.data;
    } catch (error) {
      console.error('Error fetching experience:', error);
      return [];
    }
  },

  // Contact form submission
  submitContactForm: async (formData) => {
    try {
      const response = await api.post('/portfolio/contact/', formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
      throw new Error('Failed to send message. Please try again.');
    }
  },
};

export default api;
