import React from 'react'
import { motion } from 'framer-motion'

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  size = 'md', 
  variant = 'primary',
  showValue = false,
  animated = true,
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  }

  const variants = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    accent: 'from-accent-500 to-accent-600',
    success: 'from-success-500 to-success-600',
    warning: 'from-warning-500 to-warning-600',
    error: 'from-error-500 to-error-600'
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${percentage}%`,
      transition: { 
        duration: animated ? 1.5 : 0, 
        ease: "easeOut" 
      }
    }
  }

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 0px rgba(99, 102, 241, 0)",
        "0 0 20px rgba(99, 102, 241, 0.6)",
        "0 0 0px rgba(99, 102, 241, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${variants[variant]} rounded-full relative overflow-hidden`}
          variants={progressVariants}
          initial={animated ? "hidden" : false}
          animate="visible"
          whileInView={animated ? "visible" : false}
          viewport={{ once: true }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{ width: '50%' }}
          />

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            variants={glowVariants}
            animate="animate"
          />
        </motion.div>
      </div>

      {/* Value display */}
      {showValue && (
        <motion.div
          className="absolute right-0 top-0 -mt-6 text-sm font-medium text-neutral-600 dark:text-neutral-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(percentage)}%
        </motion.div>
      )}
    </div>
  )
}

export default ProgressBar