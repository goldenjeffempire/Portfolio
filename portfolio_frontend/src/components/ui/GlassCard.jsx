import React from 'react'
import { motion } from 'framer-motion'

const GlassCard = ({ 
  children, 
  className = '', 
  hover = false, 
  gradient = false,
  blur = 'md',
  opacity = 'medium',
  border = true,
  shadow = true,
  ...props 
}) => {
  const blurClasses = {
    none: '',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  }

  const opacityClasses = {
    light: 'bg-white/60 dark:bg-neutral-900/60',
    medium: 'bg-white/80 dark:bg-neutral-900/80',
    heavy: 'bg-white/95 dark:bg-neutral-900/95'
  }

  const baseClasses = `
    ${blurClasses[blur]}
    ${opacityClasses[opacity]}
    ${border ? 'border border-white/20 dark:border-neutral-700/50' : ''}
    ${shadow ? 'shadow-soft' : ''}
    rounded-2xl
    transition-all duration-300
  `

  const hoverClasses = hover ? 'hover:bg-white/90 dark:hover:bg-neutral-900/90 hover:shadow-glow hover:border-white/30 dark:hover:border-neutral-600/50' : ''
  
  const gradientClasses = gradient ? 'bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-neutral-900/90 dark:via-neutral-900/80 dark:to-neutral-900/70' : ''

  const cardVariants = {
    hover: {
      y: hover ? -4 : 0,
      scale: hover ? 1.02 : 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  const glowVariants = {
    hover: {
      boxShadow: [
        "0 10px 25px rgba(0, 0, 0, 0.1)",
        "0 20px 40px rgba(99, 102, 241, 0.15)",
        "0 10px 25px rgba(0, 0, 0, 0.1)"
      ],
      transition: { duration: 2, repeat: Infinity }
    }
  }

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${className} relative overflow-hidden group`}
      variants={hover ? { ...cardVariants, ...glowVariants } : cardVariants}
      whileHover={hover ? "hover" : undefined}
      {...props}
    >
      {/* Glass Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Hover Gradient Border */}
      {hover && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default GlassCard