import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Building, Award, CheckCircle } from 'lucide-react'

const ExperienceCard = ({ experience, index }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Present'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  }

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: { 
        duration: 0.8, 
        delay: 0.3 + index * 0.2,
        ease: "easeOut" 
      }
    }
  }

  const dotVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.5 + index * 0.2,
        type: "spring",
        stiffness: 200
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
    >
      {/* Timeline */}
      <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-primary-500 via-accent-500 to-transparent hidden lg:block">
        <motion.div
          className="w-full h-full bg-gradient-to-b from-primary-500 to-accent-500 origin-top"
          variants={timelineVariants}
        />
      </div>

      {/* Timeline Dot */}
      <motion.div
        className="absolute left-3 top-12 w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full border-4 border-white dark:border-neutral-900 shadow-lg hidden lg:block z-10"
        variants={dotVariants}
      >
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-br from-primary-400 to-accent-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Content Card */}
      <div className="lg:ml-16">
        <div className="glass-card p-8 hover-lift transition-all duration-500 group">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div className="flex-1">
              <motion.div
                className="flex items-center gap-3 mb-2"
                layoutId={`position-${experience.id}`}
              >
                <div className="p-2 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl">
                  <Building size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {experience.position}
                </h3>
                {experience.is_current && (
                  <motion.span
                    className="px-3 py-1 bg-gradient-to-r from-success-500 to-success-600 text-white text-xs font-bold rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring' }}
                  >
                    CURRENT
                  </motion.span>
                )}
              </motion.div>
              
              <motion.p
                className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2"
                layoutId={`company-${experience.id}`}
              >
                {experience.company}
              </motion.p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                {experience.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{experience.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>
                    {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {experience.description}
            </p>
          </motion.div>

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Award size={18} className="text-accent-500" />
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Key Achievements
                </h4>
              </div>
              <div className="space-y-3">
                {experience.achievements.map((achievement, achIndex) => (
                  <motion.div
                    key={achIndex}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + achIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center mt-0.5"
                      whileHover={{ scale: 1.2 }}
                    >
                      <CheckCircle size={12} className="text-white" />
                    </motion.div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {achievement}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="px-3 py-1 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full border border-primary-200 dark:border-primary-800"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ 
                      delay: 0.7 + techIndex * 0.05,
                      hover: { duration: 0.2 }
                    }}
                    viewport={{ once: true }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Hover Effect Border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
        </div>
      </div>
    </motion.div>
  )
}

export default ExperienceCard