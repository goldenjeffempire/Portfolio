import React from 'react'
import { motion } from 'framer-motion'

const AnimatedBackground = ({ variant = 'particles', className = '' }) => {
  if (variant === 'particles') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Larger Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-4 h-4 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/50 dark:from-primary-900/10 dark:via-transparent dark:to-accent-900/10" />
        
        {/* Animated Dot Grid */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-8" style={{ marginTop: `${rowIndex * 40}px` }}>
              {[...Array(20)].map((_, colIndex) => (
                <motion.div
                  key={colIndex}
                  className="w-1 h-1 bg-primary-400/20 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: (rowIndex + colIndex) * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
          >
            <div className="w-8 h-8 border border-accent-400/20 rotate-45" />
          </motion.div>
        ))}
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50/50 to-secondary-50 dark:from-primary-900/20 dark:via-accent-900/10 dark:to-secondary-900/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.1))",
              "linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.05), rgba(99, 102, 241, 0.1))",
              "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.1))"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Blur Circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`blur-${i}`}
            className="absolute rounded-full filter blur-3xl opacity-30"
            style={{
              width: `${Math.random() * 300 + 200}px`,
              height: `${Math.random() * 300 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, ${
                i % 3 === 0 ? 'rgba(99, 102, 241, 0.3)' :
                i % 3 === 1 ? 'rgba(168, 85, 247, 0.3)' :
                'rgba(236, 72, 153, 0.3)'
              }, transparent)`
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    )
  }

  return null
}

export default AnimatedBackground