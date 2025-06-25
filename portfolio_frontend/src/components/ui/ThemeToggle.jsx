import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../ThemeProvider'

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()

  const toggleVariants = {
    light: { 
      backgroundColor: '#f1f5f9', 
      justifyContent: 'flex-start',
      transition: { duration: 0.3 }
    },
    dark: { 
      backgroundColor: '#0f172a', 
      justifyContent: 'flex-end',
      transition: { duration: 0.3 }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      scale: 0, 
      rotate: 180,
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${className}`}
      variants={toggleVariants}
      animate={theme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="w-6 h-6 bg-white dark:bg-neutral-800 rounded-full shadow-soft flex items-center justify-center"
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          {theme === 'light' ? (
            <motion.div
              key="sun"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Sun size={14} className="text-yellow-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Moon size={14} className="text-blue-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle