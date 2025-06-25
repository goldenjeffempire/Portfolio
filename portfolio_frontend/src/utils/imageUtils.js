
// Image utility functions for handling profile images and fallbacks

export const getImageUrl = (imagePath, baseUrl = null) => {
  if (!imagePath) return null
  
  const apiBaseUrl = baseUrl || import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://0.0.0.0:8000'
  
  // Handle both relative and absolute paths
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  return `${apiBaseUrl}/media/${imagePath}`
}

export const generateAvatarUrl = (name, size = 200) => {
  // Generate a placeholder avatar using initials
  if (!name) return null
  
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
  
  // Use a service like UI Avatars or generate a data URL
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&size=${size}&background=6366f1&color=ffffff&format=svg`
}

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export const getOptimizedImageUrl = (imagePath, width = null, height = null, quality = 85) => {
  const baseUrl = getImageUrl(imagePath)
  
  if (!baseUrl || baseUrl.includes('ui-avatars.com')) {
    return baseUrl
  }
  
  // In a real production environment, you might use a service like Cloudinary
  // For now, return the original URL
  return baseUrl
}
