import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  ChevronDown, 
  Code2, 
  Rocket, 
  Users, 
  Award,
  TrendingUp,
  Zap,
  Brain,
  Globe,
  ArrowRight,
  Download,
  Play,
  CheckCircle,
  Star,
  Target,
  Lightbulb
} from 'lucide-react'
import { useTheme } from '../components/ThemeProvider'
import ProfileImage from '../components/ui/ProfileImage'

const HomePage = () => {
  const [profileData, setProfileData] = useState(null)
  const [statsData, setStatsData] = useState({
    projectsCompleted: 50,
    clientsSatisfied: 35,
    yearsExperience: 5,
    technologiesMastered: 25
  })
  const [currentRole, setCurrentRole] = useState(0)
  const { theme } = useTheme()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  const roles = [
    "Full-Stack Developer",
    "AI Engineer",
    "Solution Architect",
    "Tech Entrepreneur"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Fetch profile data
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://0.0.0.0:8000/api'
    fetch(`${apiUrl}/profile/`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setProfileData(data[0])
        }
      })
      .catch(err => console.error('Error fetching profile:', err))
  }, [])

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.25, 0, 1],
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(99, 102, 241, 0.3)",
        "0 0 40px rgba(99, 102, 241, 0.6)",
        "0 0 20px rgba(99, 102, 241, 0.3)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const achievements = [
    { icon: Target, label: "Projects Delivered", value: "50+", color: "text-primary-500" },
    { icon: Users, label: "Happy Clients", value: "35+", color: "text-accent-500" },
    { icon: Award, label: "Years Experience", value: "5+", color: "text-secondary-500" },
    { icon: TrendingUp, label: "Success Rate", value: "98%", color: "text-success-500" }
  ]

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Solutions",
      description: "Building intelligent applications with custom AI models and machine learning capabilities."
    },
    {
      icon: Rocket,
      title: "Scalable Architecture",
      description: "Designing robust systems that grow with your business and handle millions of users."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Creating solutions that serve users worldwide with multi-language and cross-platform support."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimizing performance for sub-second response times and exceptional user experiences."
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        {/* Animated Background Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-secondary-400/20 to-primary-400/20 rounded-full blur-3xl"
        />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <motion.div
                  className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  <Lightbulb size={16} className="mr-2" />
                  Available for exciting opportunities
                </motion.div>

                <h1 className="text-5xl lg:text-7xl font-display font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                  Hi, I'm{' '}
                  <span className="text-gradient bg-gradient-to-r from-primary-600 via-accent-600 to-secondary-600 bg-clip-text text-transparent">
                    Jeffery
                  </span>
                </h1>

                <div className="h-16 flex items-center">
                  <motion.h2
                    key={currentRole}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-2xl lg:text-4xl font-semibold text-neutral-700 dark:text-neutral-300"
                  >
                    {roles[currentRole]}
                  </motion.h2>
                </div>
              </motion.div>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl"
              >
                I build intelligent, scalable applications that solve real-world problems. 
                Currently leading <strong className="text-primary-600 dark:text-primary-400">Echoverse App</strong>, 
                an AI-powered platform revolutionizing digital experiences.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to="/projects">
                  <motion.button
                    className="btn-primary px-8 py-4 text-lg font-semibold"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                    <ArrowRight size={20} className="ml-2" />
                  </motion.button>
                </Link>

                <Link to="/contact">
                  <motion.button
                    className="btn-outline px-8 py-4 text-lg font-semibold"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Let's Connect
                  </motion.button>
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-6 pt-8 border-t border-neutral-200 dark:border-neutral-700"
              >
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-white dark:border-neutral-900 flex items-center justify-center text-white text-sm font-bold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Trusted by 35+ clients worldwide
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative z-10"
              >
                <motion.div
                  variants={glowVariants}
                  animate="animate"
                  className="w-full max-w-lg mx-auto aspect-square bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 rounded-3xl p-1"
                >
                  <div className="w-full h-full bg-neutral-50 dark:bg-neutral-900 rounded-3xl flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <motion.div
                        className="w-24 h-24 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl mx-auto flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Code2 size={40} className="text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        Building the Future
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        One line of code at a time
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-accent-400 to-secondary-400 rounded-2xl flex items-center justify-center"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Brain size={32} className="text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary-400 to-accent-400 rounded-xl flex items-center justify-center"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Rocket size={24} className="text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-neutral-400" />
        </motion.div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding-sm bg-neutral-100/50 dark:bg-neutral-800/50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <motion.div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-${achievement.color.split('-')[1]}-100 to-${achievement.color.split('-')[1]}-200 dark:from-${achievement.color.split('-')[1]}-900/30 dark:to-${achievement.color.split('-')[1]}-800/30 flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <achievement.icon size={28} className={achievement.color} />
                </motion.div>
                <div>
                  <motion.h3
                    className="text-3xl font-bold text-neutral-900 dark:text-neutral-100"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {achievement.value}
                  </motion.h3>
                  <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                    {achievement.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 dark:text-neutral-100">
              Why Choose Me?
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              I bring a unique combination of technical expertise, creative problem-solving, 
              and business acumen to every project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  className="card p-8 hover-lift text-center space-y-6 h-full"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    <feature.icon size={28} className="text-primary-600 dark:text-primary-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-accent-900 to-secondary-900 text-white">
        <div className="section-container text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
              Let's discuss your project and create a solution that exceeds your expectations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/contact">
              <motion.button
                className="bg-white text-primary-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-neutral-100 transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start a Project</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>

            <Link to="/projects">
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-900 transition-all flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Portfolio</span>
                <Play size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioApi } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch data with individual error handling
        const [profile, projects, skills, experience] = await Promise.allSettled([
          portfolioApi.getProfile(),
          portfolioApi.getProjects(),
          portfolioApi.getSkills(),
          portfolioApi.getExperience()
        ]);

        setPortfolioData({
          profile: profile.status === 'fulfilled' ? profile.value : null,
          projects: projects.status === 'fulfilled' ? projects.value : [],
          skills: skills.status === 'fulfilled' ? skills.value : [],
          experience: experience.status === 'fulfilled' ? experience.value : []
        });
      } catch (error) {
        setError('Failed to load portfolio data');
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  const profile = portfolioData?.profile;
  const projects = portfolioData?.projects?.slice(0, 3) || [];
  const skills = portfolioData?.skills?.slice(0, 6) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Jeffery
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              {profile?.title || 'Full Stack Developer'}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
              {profile?.bio || 'Passionate about creating innovative digital solutions with modern technologies.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/projects"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                View My Work
                <ArrowRight className="ml-2" size={20} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-colors"
              >
                Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mt-12">
              <a
                href="https://github.com/jefferyemuodafevwar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/jeffery-emuodafevwar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:jeffemuodafe124@gmail.com"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      {skills.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Skills & Technologies
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Technologies I work with to bring ideas to life
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {skill.name}
                  </h3>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {skill.proficiency}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Some of my recent work
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.split(',').slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-700 font-medium"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/projects"
                className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                View All Projects
                <ArrowRight className="ml-2" size={20} />
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;