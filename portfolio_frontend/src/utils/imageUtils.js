// Image utility functions for portfolio
export const getImageUrl = (imagePath, fallback = '/api/static/images/placeholder.jpg') => {
  if (!imagePath) return fallback;

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;

  // If it's a relative path, construct the full URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://0.0.0.0:5000';
  return `${baseUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

// Optimize image loading
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Get profile image with fallback
export const getProfileImageUrl = (profileData) => {
  if (profileData?.profile_image) {
    return getImageUrl(profileData.profile_image);
  }
  return '/api/static/images/default-profile.jpg';
};

// Get project image with fallback
export const getProjectImageUrl = (projectData) => {
  if (projectData?.image) {
    return getImageUrl(projectData.image);
  }
  return '/api/static/images/default-project.jpg';
};