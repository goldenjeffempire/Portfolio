import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  href,
  to,
  target,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white shadow-soft hover:shadow-glow focus:ring-primary-500',
    secondary: 'bg-gradient-to-r from-secondary-600 to-accent-600 hover:from-secondary-700 hover:to-accent-700 text-white shadow-soft hover:shadow-glow focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400 dark:hover:text-neutral-900 focus:ring-primary-500',
    ghost: 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 focus:ring-neutral-500',
    success: 'bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white shadow-soft hover:shadow-glow focus:ring-success-500',
    error: 'bg-gradient-to-r from-error-600 to-error-700 hover:from-error-700 hover:to-error-800 text-white shadow-soft hover:shadow-glow focus:ring-error-500'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm gap-2',
    md: 'px-4 py-3 text-base gap-2',
    lg: 'px-6 py-4 text-lg gap-3',
    xl: 'px-8 py-5 text-xl gap-3'
  }

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
    (disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
  }`

  const buttonVariants = {
    hover: { 
      scale: disabled || loading ? 1 : 1.05,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: disabled || loading ? 1 : 0.95,
      transition: { duration: 0.1 }
    }
  }

  const iconVariants = {
    hover: {
      x: iconPosition === 'right' ? 5 : -5,
      transition: { duration: 0.2 }
    }
  }

  const shimmerVariants = {
    hover: {
      x: ['0%', '100%'],
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  }

  const renderContent = () => (
    <>
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
        variants={shimmerVariants}
        style={{ width: '20%' }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-inherit">
        {Icon && iconPosition === 'left' && !loading && (
          <motion.div variants={iconVariants}>
            <Icon size={size === 'sm' ? 16 : size === 'lg' || size === 'xl' ? 24 : 20} />
          </motion.div>
        )}
        
        {loading && (
          <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        <span>{children}</span>
        
        {Icon && iconPosition === 'right' && !loading && (
          <motion.div variants={iconVariants}>
            <Icon size={size === 'sm' ? 16 : size === 'lg' || size === 'xl' ? 24 : 20} />
          </motion.div>
        )}
      </div>
    </>
  )

  const buttonProps = {
    className: buttonClasses,
    onClick: disabled || loading ? undefined : onClick,
    disabled: disabled || loading,
    type,
    ...props
  }

  if (to) {
    return (
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Link to={to} {...buttonProps}>
          {renderContent()}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} {...buttonProps}>
          {renderContent()}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      {...buttonProps}
    >
      {renderContent()}
    </motion.button>
  )
}

export default Button