import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, Calendar, ArrowUpRight } from 'lucide-react'

const ProjectCard = ({ project, index, featured = false, variant = 'default' }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  }

  const imageVariants = {
    hover: { scale: 1.1, rotate: 2 }
  }

  const overlayVariants = {
    hover: { opacity: 1 }
  }

  const badgeVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
      className="group relative"
    >
      <div className="glass-card p-0 overflow-hidden hover-lift transition-all duration-500 group-hover:shadow-glow">
        {/* Project Image */}
        <div className="relative overflow-hidden h-48 md:h-56">
          {project.image ? (
            <motion.img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
              variants={imageVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-400 via-primary-500 to-accent-500 flex items-center justify-center relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-400/80 to-accent-500/80"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8))",
                    "linear-gradient(45deg, rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))",
                    "linear-gradient(45deg, rgba(236, 72, 153, 0.8), rgba(99, 102, 241, 0.8))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.span
                className="text-white text-4xl font-bold relative z-10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {project.title.charAt(0)}
              </motion.span>
            </div>
          )}
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
          />
          
          {/* Featured Badge */}
          {featured && (
            <motion.div
              className="absolute top-4 right-4"
              variants={badgeVariants}
              initial="initial"
              animate="animate"
            >
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-soft">
                <Star size={12} className="fill-current" />
                FEATURED
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            className="absolute top-4 left-4 flex space-x-2 opacity-0"
            variants={overlayVariants}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors shadow-soft"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={16} />
              </motion.a>
            )}
            {project.live_url && (
              <motion.a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors shadow-soft"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <motion.h3
              className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1 flex-1"
              layoutId={`title-${project.id}`}
            >
              {project.title}
            </motion.h3>
            <motion.div
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ x: 5 }}
            >
              <ArrowUpRight size={20} className="text-neutral-400" />
            </motion.div>
          </div>
          
          <motion.p
            className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 text-sm leading-relaxed"
            layoutId={`description-${project.id}`}
          >
            {project.description}
          </motion.p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies && project.technologies.slice(0, 4).map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-md border border-primary-200 dark:border-primary-800"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + techIndex * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies && project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              {project.github_url && (
                <motion.a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors text-sm font-medium"
                  whileHover={{ x: 3 }}
                >
                  <Github size={16} />
                  <span>Code</span>
                </motion.a>
              )}
              {project.live_url && (
                <motion.a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm font-medium"
                  whileHover={{ x: 3 }}
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </motion.a>
              )}
            </div>
            
            {project.created_at && (
              <div className="flex items-center space-x-1 text-xs text-neutral-500 dark:text-neutral-400">
                <Calendar size={12} />
                <span>{new Date(project.created_at).getFullYear()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover Gradient Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
      </div>
    </motion.div>
  )
}

export default ProjectCard