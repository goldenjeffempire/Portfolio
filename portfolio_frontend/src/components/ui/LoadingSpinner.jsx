import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  variant = 'primary',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const variants = {
    primary: 'border-primary-600 border-t-transparent dark:border-primary-400',
    secondary: 'border-accent-600 border-t-transparent dark:border-accent-400',
    neutral: 'border-neutral-600 border-t-transparent dark:border-neutral-400'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-solid rounded-full ${variants[variant]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-neutral-600 dark:text-neutral-400 font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

export default LoadingSpinner
import React from 'react';

const LoadingSpinner = ({ size = 'large', className = '' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`
            ${sizeClasses[size]} 
            border-4 border-gray-200 border-t-blue-600 
            rounded-full animate-spin
            dark:border-gray-700 dark:border-t-blue-400
          `}
        />
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
