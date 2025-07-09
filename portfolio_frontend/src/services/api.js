
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://0.0.0.0:5000/api';

// Enhanced request handler with better error handling
const makeRequest = async (url, options = {}) => {
  const fullUrl = `${API_BASE_URL}${url}`;

  try {
    const response = await fetch(fullUrl, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: 'omit',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Enhanced API service methods
export const portfolioApi = {
  // Get all portfolio data with enhanced error handling
  async getPortfolioData() {
    try {
      const [profileRes, projectsRes, skillsRes, experienceRes] = await Promise.allSettled([
        this.getProfile(),
        this.getProjects(),
        this.getSkills(),
        this.getExperience()
      ]);

      return {
        profile: profileRes.status === 'fulfilled' ? profileRes.value : null,
        projects: projectsRes.status === 'fulfilled' ? projectsRes.value : [],
        skills: skillsRes.status === 'fulfilled' ? skillsRes.value : {},
        experience: experienceRes.status === 'fulfilled' ? experienceRes.value : [],
        errors: {
          profile: profileRes.status === 'rejected' ? profileRes.reason.message : null,
          projects: projectsRes.status === 'rejected' ? projectsRes.reason.message : null,
          skills: skillsRes.status === 'rejected' ? skillsRes.reason.message : null,
          experience: experienceRes.status === 'rejected' ? experienceRes.reason.message : null,
        }
      };
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      throw error;
    }
  },

  // Get profile data
  async getProfile() {
    try {
      const response = await makeRequest('/portfolio/profile/');
      return response.success ? response.data : (Array.isArray(response) && response.length > 0 ? response[0] : response);
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  },

  // Get projects
  async getProjects() {
    try {
      const response = await makeRequest('/portfolio/projects/');
      return response.success ? response.data : (Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },

  // Get skills
  async getSkills() {
    try {
      const response = await makeRequest('/portfolio/skills/');
      return response.success ? response.data : (Array.isArray(response) ? response : {});
    } catch (error) {
      console.error('Error fetching skills:', error);
      return {};
    }
  },

  // Get experience
  async getExperience() {
    try {
      const response = await makeRequest('/portfolio/experience/');
      return response.success ? response.data : (Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching experience:', error);
      return [];
    }
  },

  // Submit contact form
  async submitContact(contactData) {
    try {
      const response = await makeRequest('/portfolio/contact/', {
        method: 'POST',
        body: contactData,
      });
      return response;
    } catch (error) {
      console.error('Error submitting contact:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck() {
    try {
      const response = await makeRequest('/portfolio/health/');
      return response;
    } catch (error) {
      console.error('Error in health check:', error);
      return { status: 'error', message: error.message };
    }
  }
};

// Enhanced error handler utility
export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data?.message || error.response.data?.error || 'An error occurred';
  } else if (error.request) {
    return 'Network error. Please check your connection.';
  } else {
    return error.message || 'An unexpected error occurred';
  }
};

// Loading state utility
export const createLoadingState = () => ({
  isLoading: false,
  error: null,
  data: null,
  
  setLoading: function(loading) {
    this.isLoading = loading;
    if (loading) {
      this.error = null;
    }
  },
  
  setError: function(error) {
    this.error = error;
    this.isLoading = false;
  },
  
  setData: function(data) {
    this.data = data;
    this.isLoading = false;
    this.error = null;
  }
});

export default portfolioApi;
