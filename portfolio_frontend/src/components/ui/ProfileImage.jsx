
import React, { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import { motion } from 'framer-motion'
import { getImageUrl, generateAvatarUrl, preloadImage } from '../../utils/imageUtils'

const ProfileImage = ({ 
  profileData, 
  size = 'large', 
  className = '',
  showFallback = true,
  animate = true 
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-32 h-32', 
    large: 'w-80 h-80',
    xl: 'w-96 h-96'
  }

  const imageUrl = getImageUrl(profileData?.profile_image)
  const fallbackAvatarUrl = generateAvatarUrl(profileData?.full_name)

  useEffect(() => {
    if (imageUrl) {
      preloadImage(imageUrl)
        .then(() => {
          setImageLoaded(true)
          setImageError(false)
        })
        .catch(() => {
          setImageError(true)
          setImageLoaded(false)
        })
    }
  }, [imageUrl])

  const ImageContainer = animate ? motion.div : 'div'
  const imageProps = animate ? {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.3 }
  } : {}

  return (
    <ImageContainer 
      className={`relative ${sizeClasses[size]} ${className}`}
      {...imageProps}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-3xl transform rotate-6"></div>
      <div className="relative w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20"></div>
        <div className="relative z-10 w-full h-full">
          {imageUrl && !imageError && imageLoaded ? (
            <img
              src={imageUrl}
              alt={profileData?.full_name || 'Profile'}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={() => setImageError(true)}
            />
          ) : fallbackAvatarUrl && !imageError ? (
            <img
              src={fallbackAvatarUrl}
              alt={profileData?.full_name || 'Profile'}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={() => setImageError(true)}
            />
          ) : showFallback ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className={`${size === 'small' ? 'w-8 h-8' : size === 'medium' ? 'w-16 h-16' : 'w-32 h-32'} bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mx-auto flex items-center justify-center shadow-xl`}>
                  <User size={size === 'small' ? 16 : size === 'medium' ? 32 : 60} className="text-white" />
                </div>
                {size !== 'small' && (
                  <div>
                    <h3 className={`${size === 'medium' ? 'text-lg' : 'text-2xl'} font-bold text-neutral-900 dark:text-neutral-100`}>
                      {profileData?.full_name || 'Jeffery Onome'}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Full-Stack Engineer
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
          
          {/* Loading state */}
          {imageUrl && !imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
              <div className="animate-pulse w-8 h-8 bg-neutral-300 dark:bg-neutral-600 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </ImageContainer>
  )
}

export default ProfileImage
