const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://0.0.0.0:5000/api';

// Create axios instance
const api = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};

// Helper function to make requests
const makeRequest = async (url, options = {}) => {
  const fullUrl = `${API_BASE_URL}${url}`;

  try {
    const response = await fetch(fullUrl, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API service methods
export const portfolioApi = {
  // Get all portfolio data
  async getPortfolioData() {
    try {
      const [profile, projects, skills, experience] = await Promise.all([
        this.getProfile(),
        this.getProjects(),
        this.getSkills(),
        this.getExperience()
      ]);

      return { profile, projects, skills, experience };
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      throw error;
    }
  },

  // Get profile data
  async getProfile() {
    return await makeRequest('/profile/');
  },

  // Get projects
  async getProjects() {
    return await makeRequest('/projects/');
  },

  // Get skills
  async getSkills() {
    return await makeRequest('/skills/');
  },

  // Get experience
  async getExperience() {
    return await makeRequest('/experience/');
  },

  // Submit contact form
  async submitContact(contactData) {
    return await makeRequest('/contact/', {
      method: 'POST',
      body: contactData,
    });
  },

  // Health check
  async healthCheck() {
    return await makeRequest('/health/');
  }
};

// Error handler utility
export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    return 'Network error. Please check your connection.';
  } else {
    return error.message || 'An unexpected error occurred';
  }
};

export default portfolioApi;