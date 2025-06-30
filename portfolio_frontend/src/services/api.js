
/**
 * API Service - Production Ready
 * Handles all API calls with proper error handling and retries
 */

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication and logging
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    
    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (import.meta.env.DEV) {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      message: error.message,
    });
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.warn('Unauthorized access detected');
    } else if (error.response?.status === 500) {
      console.error('Server error detected');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    
    return Promise.reject(error);
  }
);

// Utility function for retry logic
const withRetry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && (error.code === 'ECONNABORTED' || error.response?.status >= 500)) {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 1.5);
    }
    throw error;
  }
};

// API endpoints
const endpoints = {
  // Health check
  health: () => withRetry(() => api.get('/health/')),
  
  // Profile endpoints
  getProfile: () => withRetry(() => api.get('/profile/')),
  
  // Projects endpoints
  getProjects: () => withRetry(() => api.get('/projects/')),
  getProject: (id) => withRetry(() => api.get(`/projects/${id}/`)),
  
  // Skills endpoints
  getSkills: () => withRetry(() => api.get('/skills/')),
  
  // Experience endpoints
  getExperience: () => withRetry(() => api.get('/experience/')),
  
  // Contact endpoint
  submitContact: (data) => withRetry(() => api.post('/contact/', data)),
};

// Helper functions for common patterns
export const ApiService = {
  ...endpoints,
  
  // Generic GET request with caching
  async get(url, options = {}) {
    try {
      const response = await withRetry(() => api.get(url, options));
      return response.data;
    } catch (error) {
      console.error(`GET ${url} failed:`, error);
      throw new Error(error.response?.data?.message || error.message || 'Request failed');
    }
  },
  
  // Generic POST request
  async post(url, data, options = {}) {
    try {
      const response = await withRetry(() => api.post(url, data, options));
      return response.data;
    } catch (error) {
      console.error(`POST ${url} failed:`, error);
      throw new Error(error.response?.data?.error || error.message || 'Request failed');
    }
  },
  
  // Check API health
  async checkHealth() {
    try {
      const response = await this.health();
      return response.data?.status === 'healthy';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },
  
  // Get all portfolio data at once
  async getPortfolioData() {
    try {
      const [profile, projects, skills, experience] = await Promise.allSettled([
        this.getProfile(),
        this.getProjects(),
        this.getSkills(),
        this.getExperience(),
      ]);
      
      return {
        profile: profile.status === 'fulfilled' ? profile.value.data : null,
        projects: projects.status === 'fulfilled' ? projects.value.data : [],
        skills: skills.status === 'fulfilled' ? skills.value.data : {},
        experience: experience.status === 'fulfilled' ? experience.value.data : [],
        errors: {
          profile: profile.status === 'rejected' ? profile.reason : null,
          projects: projects.status === 'rejected' ? projects.reason : null,
          skills: skills.status === 'rejected' ? skills.reason : null,
          experience: experience.status === 'rejected' ? experience.reason : null,
        }
      };
    } catch (error) {
      console.error('Failed to fetch portfolio data:', error);
      throw error;
    }
  },
};

export default ApiService;
