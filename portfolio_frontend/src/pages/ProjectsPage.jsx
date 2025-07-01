import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ExternalLink, 
  Github, 
  Calendar,
  Code2,
  Star,
  TrendingUp,
  Users,
  Zap,
  Brain,
  Globe,
  ArrowRight
} from 'lucide-react'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const filters = [
    { id: 'all', name: 'All Projects', count: 0 },
    { id: 'featured', name: 'Featured', count: 0 },
    { id: 'ai', name: 'AI/ML', count: 0 },
    { id: 'web', name: 'Web Apps', count: 0 },
    { id: 'api', name: 'APIs', count: 0 }
  ]

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [searchTerm, selectedFilter, projects])

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/projects/')
      const data = await response.json()
      setProjects(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching projects:', error)
      setLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = projects

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      switch (selectedFilter) {
        case 'featured':
          filtered = filtered.filter(project => project.is_featured)
          break
        case 'ai':
          filtered = filtered.filter(project =>
            project.technologies.some(tech =>
              ['ai', 'ml', 'tensorflow', 'pytorch', 'openai', 'machine learning'].includes(tech.toLowerCase())
            )
          )
          break
        case 'web':
          filtered = filtered.filter(project =>
            project.technologies.some(tech =>
              ['react', 'vue', 'angular', 'next.js', 'django', 'express'].includes(tech.toLowerCase())
            )
          )
          break
        case 'api':
          filtered = filtered.filter(project =>
            project.technologies.some(tech =>
              ['api', 'rest', 'graphql', 'fastapi', 'django'].includes(tech.toLowerCase())
            )
          )
          break
        default:
          break
      }
    }

    setFilteredProjects(filtered)
  }

  const getProjectIcon = (project) => {
    const title = project.title.toLowerCase()
    if (title.includes('ai') || title.includes('chat') || title.includes('echoverse')) {
      return Brain
    } else if (title.includes('trading') || title.includes('finance')) {
      return TrendingUp
    } else if (title.includes('track') || title.includes('monitor')) {
      return Globe
    } else {
      return Code2
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding-sm bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 dark:from-primary-950 dark:via-accent-950 dark:to-secondary-950">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-neutral-100">
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              A showcase of innovative solutions, from AI-powered platforms to scalable web applications. 
              Each project represents a unique challenge and creative solution.
            </p>
            <div className="flex items-center justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">50+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">10M+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Lines of Code</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">99.9%</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Uptime</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="section-container py-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-primary-600 text-white shadow-glow'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.name}
              </motion.button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-neutral-700 shadow-soft'
                  : 'text-neutral-400'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <Grid size={20} />
            </motion.button>
            <motion.button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-neutral-700 shadow-soft'
                  : 'text-neutral-400'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <List size={20} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-container pb-20">
        <AnimatePresence>
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center">
                <Search size={32} className="text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                No projects found
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Try adjusting your search terms or filters
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === 'grid'
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  viewMode={viewMode}
                  variants={itemVariants}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

const ProjectCard = ({ project, viewMode, variants }) => {
  const ProjectIcon = project.title.toLowerCase().includes('ai') || project.title.toLowerCase().includes('echoverse') ? Brain :
                     project.title.toLowerCase().includes('trading') ? TrendingUp :
                     project.title.toLowerCase().includes('track') ? Globe : Code2

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={variants}
        className="card p-6 hover-lift"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl flex items-center justify-center mb-4">
              <ProjectIcon size={40} className="text-primary-600 dark:text-primary-400" />
            </div>
            {project.is_featured && (
              <div className="inline-flex items-center px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-medium">
                <Star size={12} className="mr-1 fill-current" />
                Featured
              </div>
            )}
          </div>
          
          <div className="lg:w-2/3 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {project.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 6).map((tech, index) => (
                <span
                  key={index}
                  className="skill-tag text-xs"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 6 && (
                <span className="skill-tag text-xs">
                  +{project.technologies.length - 6} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                <Calendar size={16} />
                <span>{new Date(project.created_at).getFullYear()}</span>
              </div>
              
              <div className="flex space-x-3">
                {project.github_url && (
                  <motion.a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={18} />
                  </motion.a>
                )}
                {project.live_url && (
                  <motion.a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={variants}
      className="group card hover-lift overflow-hidden"
      whileHover={{ y: -5 }}
    >
      {/* Project Image/Icon */}
      <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <ProjectIcon size={48} className="text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300" />
        </div>
        {project.is_featured && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Star size={12} className="mr-1 fill-current" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="skill-tag text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="skill-tag text-xs">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
            <Calendar size={16} />
            <span>{new Date(project.created_at).getFullYear()}</span>
          </div>
          
          <div className="flex space-x-3">
            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={18} />
              </motion.a>
            )}
            {project.live_url && (
              <motion.a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={18} />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectsPage
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await portfolioApi.getProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project =>
          project.technologies?.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  }, [filter, projects]);

  const technologies = [...new Set(
    projects.flatMap(project =>
      project.technologies?.split(',').map(tech => tech.trim()) || []
    )
  )].slice(0, 8);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All Projects
          </button>
          {technologies.map((tech, index) => (
            <button
              key={index}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filter === tech
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {project.image && (
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300" />
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies?.split(',').slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 dark:text-gray-400 font-medium"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filter or check back later for new projects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
