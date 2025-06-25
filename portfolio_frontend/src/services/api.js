import axios from 'axios'

// Determine API base URL based on environment
const API_BASE_URL = import.meta.env.PROD
  ? (import.meta.env.VITE_PROD_API_BASE_URL || 'https://your-backend-app.replit.app/api')
  : (import.meta.env.VITE_API_BASE_URL || 'http://0.0.0.0:8000/api');

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const portfolioAPI = {
  // Get profile data
  getProfile: () => api.get('/profile/'),

  // Get skills
  getSkills: () => api.get('/skills/'),

  // Get experience
  getExperience: () => api.get('/experience/'),

  // Get projects
  getProjects: () => api.get('/projects/'),

  // Get education
  getEducation: () => api.get('/education/'),

  // Send contact message
  sendContactMessage: (data) => api.post('/contact/', data),
}

export default api