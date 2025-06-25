import React from 'react'
import { motion } from 'framer-motion'
import { Star, TrendingUp, Award, Zap } from 'lucide-react'

const SkillCard = ({ 
  skill, 
  index = 0, 
  showProgress = false, 
  variant = 'default', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-6 text-lg'
  }

  const progressPercentage = (skill.proficiency_level / 5) * 100

  const getSkillIcon = (category) => {
    switch (category) {
      case 'languages':
        return <Award size={16} className="text-primary-500" />
      case 'frameworks':
        return <Zap size={16} className="text-accent-500" />
      case 'tools':
        return <TrendingUp size={16} className="text-secondary-500" />
      default:
        return <Star size={16} className="text-success-500" />
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.25, 0.25, 0, 1]
      }
    },
    hover: {
      y: -8,
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: `${progressPercentage}%`,
      transition: { 
        duration: 1.5, 
        delay: 0.5 + index * 0.1, 
        ease: "easeOut" 
      }
    }
  }

  const glowVariants = {
    hover: {
      boxShadow: [
        "0 0 20px rgba(99, 102, 241, 0.3)",
        "0 0 40px rgba(168, 85, 247, 0.4)",
        "0 0 20px rgba(99, 102, 241, 0.3)"
      ],
      transition: { duration: 2, repeat: Infinity }
    }
  }

  if (variant === 'glow') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true }}
        className="relative group"
      >
        <motion.div
          variants={glowVariants}
          className={`glass-card ${sizeClasses[size]} text-center hover-lift transition-all duration-300 relative overflow-hidden`}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Skill Icon */}
          <motion.div
            className="flex items-center justify-center mb-2"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {getSkillIcon(skill.category)}
          </motion.div>
          
          {/* Skill Name */}
          <motion.h4
            className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 relative z-10"
            layoutId={`skill-name-${skill.id}`}
          >
            {skill.name}
          </motion.h4>
          
          {/* Proficiency Stars */}
          {skill.proficiency_level && (
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Star
                    size={12}
                    className={`${
                      i < skill.proficiency_level 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-neutral-300 dark:text-neutral-600'
                    } transition-colors`}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={showProgress ? {} : "hover"}
      viewport={{ once: true }}
      className="relative"
    >
      <div className={`glass-card ${sizeClasses[size]} ${!showProgress ? 'hover-lift' : ''} transition-all duration-300`}>
        {showProgress ? (
          // Progress Bar Layout
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              {getSkillIcon(skill.category)}
              <span className="font-medium text-neutral-900 dark:text-neutral-100 flex-1">
                {skill.name}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-20 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  variants={progressVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </div>
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 w-6">
                {skill.proficiency_level}/5
              </span>
            </div>
          </div>
        ) : (
          // Tag Layout
          <div className="flex items-center justify-center space-x-2">
            {getSkillIcon(skill.category)}
            <motion.span
              className="font-medium text-neutral-900 dark:text-neutral-100 text-center"
              layoutId={`skill-name-${skill.id}`}
            >
              {skill.name}
            </motion.span>
            {skill.is_featured && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <Star size={12} className="text-yellow-400 fill-current" />
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default SkillCard