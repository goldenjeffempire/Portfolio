
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://0.0.0.0:5000/api';

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
    try {
      const response = await makeRequest('/portfolio/profile/');
      return response.length > 0 ? response[0] : response;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  },

  // Get projects
  async getProjects() {
    try {
      return await makeRequest('/portfolio/projects/');
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },

  // Get skills
  async getSkills() {
    try {
      return await makeRequest('/portfolio/skills/');
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  },

  // Get experience
  async getExperience() {
    try {
      return await makeRequest('/portfolio/experience/');
    } catch (error) {
      console.error('Error fetching experience:', error);
      return [];
    }
  },

  // Submit contact form
  async submitContact(contactData) {
    try {
      return await makeRequest('/portfolio/contact/', {
        method: 'POST',
        body: contactData,
      });
    } catch (error) {
      console.error('Error submitting contact:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck() {
    try {
      return await makeRequest('/portfolio/health/');
    } catch (error) {
      console.error('Error in health check:', error);
      return { status: 'error' };
    }
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
