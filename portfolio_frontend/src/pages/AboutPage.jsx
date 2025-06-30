import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  Code2,
  Users,
  Target,
  TrendingUp,
  User,
  Github,
  Linkedin,
  Twitter,
  ExternalLink
} from 'lucide-react'
import ProfileImage from '../components/ui/ProfileImage'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ProgressBar from '../components/ui/ProgressBar'

const AboutPage = () => {
  const [profile, setProfile] = useState(null)
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [profileRes, skillsRes, experienceRes, educationRes] = await Promise.all([
        fetch('http://localhost:8000/api/profile/'),
        fetch('http://localhost:8000/api/skills/'),
        fetch('http://localhost:8000/api/experience/'),
        fetch('http://localhost:8000/api/education/')
      ])

      const profileData = await profileRes.json()
      const skillsData = await skillsRes.json()
      const experienceData = await experienceRes.json()
      const educationData = await educationRes.json()

      setProfile(profileData[0] || {})
      setSkills(skillsData)
      setExperience(experienceData)
      setEducation(educationData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const achievements = [
    { icon: Briefcase, label: "Years of Experience", value: "5+", color: "primary" },
    { icon: Code2, label: "Projects Completed", value: "50+", color: "accent" },
    { icon: Users, label: "Happy Clients", value: "35+", color: "secondary" },
    { icon: Award, label: "Certifications", value: "10+", color: "success" }
  ]

  const personalValues = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "Always seeking creative solutions and cutting-edge technologies to solve complex problems."
    },
    {
      icon: Target,
      title: "Quality Focused",
      description: "Committed to delivering excellence with clean, maintainable, and scalable code."
    },
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "Strong believer in teamwork and knowledge sharing to achieve common goals."
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "Passionate about learning new technologies and staying ahead of industry trends."
    }
  ]

  const skillCategories = [
    { id: 'languages', name: 'Programming Languages', icon: Code2 },
    { id: 'frameworks', name: 'Frameworks & Libraries', icon: Zap },
    { id: 'databases', name: 'Databases', icon: Globe },
    { id: 'tools', name: 'Tools & Technologies', icon: Target },
    { id: 'technical', name: 'AI & Machine Learning', icon: Brain },
    { id: 'soft', name: 'Soft Skills', icon: Users }
  ]

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
      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Brain size={16} className="mr-2" />
                  Full-Stack Developer & AI Engineer
                </motion.div>

                <h1 className="text-4xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-neutral-100">
                  About <span className="text-gradient">Me</span>
                </h1>

                <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {profile?.bio?.split('\n')[0] || "Passionate Full-Stack Software Engineer with 5+ years of experience building scalable web applications and AI-powered solutions."}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-neutral-700 dark:text-neutral-300">
                  <MapPin size={20} className="text-primary-600 dark:text-primary-400" />
                  <span>{profile?.location || "Lagos, Nigeria"}</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-700 dark:text-neutral-300">
                  <Mail size={20} className="text-primary-600 dark:text-primary-400" />
                  <a href={`mailto:${profile?.email}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {profile?.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-neutral-700 dark:text-neutral-300">
                  <Phone size={20} className="text-primary-600 dark:text-primary-400" />
                  <span>{profile?.phone_primary}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  className="btn-primary px-6 py-3 flex items-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={18} />
                  <span>Download Resume</span>
                </motion.button>

                <motion.a
                  href="/contact"
                  className="btn-outline px-6 py-3 flex items-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Get In Touch</span>
                  <ArrowRight size={18} />
                </motion.a>
              </div>
            </motion.div>

            {/* Profile Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 rounded-3xl p-1">
                <div className="w-full h-full bg-neutral-50 dark:bg-neutral-900 rounded-3xl flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <motion.div
                      className="w-32 h-32 bg-gradient-to-br from-primary-600 to-accent-600 rounded-3xl mx-auto flex items-center justify-center"
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-white text-4xl font-bold">JE</span>
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {profile?.full_name?.split(' ')[0] || "Jeffery"}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        AI-Powered Developer
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Badges */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Award size={32} className="text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star size={24} className="text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding-sm bg-neutral-100/50 dark:bg-neutral-800/50">
        <div className="section-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                variants={itemVariants}
                className="text-center space-y-4"
              >
                <motion.div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-${achievement.color}-100 to-${achievement.color}-200 dark:from-${achievement.color}-900/30 dark:to-${achievement.color}-800/30 flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <achievement.icon size={28} className={`text-${achievement.color}-600 dark:text-${achievement.color}-400`} />
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

      {/* Bio Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                My Journey
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {profile?.bio?.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                What Drives Me
              </h3>
              <div className="grid gap-6">
                {personalValues.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <value.icon size={24} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        {value.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-neutral-100/50 dark:bg-neutral-800/50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Technical <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A comprehensive skill set covering modern web development, AI/ML, and cloud technologies.
            </p>
          </motion.div>

          <div className="space-y-12">
            {skillCategories.map((category) => {
              const categorySkills = skills.filter(skill => skill.category === category.id)

              if (categorySkills.length === 0) return null

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl flex items-center justify-center">
                      <category.icon size={24} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {category.name}
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="card p-6 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                            {skill.name}
                          </h4>
                          {skill.is_featured && (
                            <Star size={16} className="text-yellow-500 fill-current" />
                          )}
                        </div>

                        <ProgressBar
                          value={skill.proficiency_level * 20}
                          max={100}
                          variant="primary"
                          showValue
                          animated
                        />

                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          {skill.proficiency_level === 5 && "Expert"}
                          {skill.proficiency_level === 4 && "Advanced"}
                          {skill.proficiency_level === 3 && "Intermediate"}
                          {skill.proficiency_level === 2 && "Beginner"}
                          {skill.proficiency_level === 1 && "Learning"}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Professional <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A track record of delivering impactful solutions across various industries and technologies.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-300 to-accent-300 dark:from-primary-700 dark:to-accent-700" />

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex items-start"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center flex-shrink-0 mr-8">
                    <Briefcase size={24} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="card p-8 flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                          {exp.position}
                        </h3>
                        <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold">
                          {exp.company}
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {exp.location}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400 mt-2 lg:mt-0">
                        <Calendar size={16} />
                        <span>
                          {new Date(exp.start_date).getFullYear()} - {exp.is_current ? 'Present' : new Date(exp.end_date).getFullYear()}
                        </span>
                        {exp.is_current && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">
                            Current
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start space-x-2">
                              <CheckCircle size={16} className="text-success-500 flex-shrink-0 mt-0.5" />
                              <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="skill-tag text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section-padding bg-neutral-100/50 dark:bg-neutral-800/50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Education & <span className="text-gradient">Certifications</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Continuous learning and professional development through formal education and industry certifications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover-lift"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                      {edu.degree_title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-400 capitalize">
                      {edu.education_type}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {edu.end_date ? new Date(edu.end_date).getFullYear() : 'Ongoing'}
                    </span>
                  </div>

                  {edu.field_of_study && (
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {edu.field_of_study}
                    </p>
                  )}

                  {edu.description && (
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  )}

                  {edu.credential_url && (
                    <motion.a
                      href={edu.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                      whileHover={{ x: 5 }}
                    >
                      <span>View Credential</span>
                      <ExternalLink size={14} />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
import React, { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AboutPage = () => {
  const [data, setData] = useState({
    profile: null,
    skills: [],
    experience: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioData, skills, experience] = await Promise.all([
          portfolioAPI.getPortfolioData(),
          portfolioAPI.getSkills(),
          portfolioAPI.getExperience()
        ]);

        setData({
          profile: portfolioData.profile,
          skills,
          experience
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  const { profile, skills, experience } = data;

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Learn more about my journey, skills, and passion for technology
          </p>
        </div>

        {/* Profile Section */}
        {profile && (
          <div className="mb-16">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {profile.name}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {profile.bio}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Location: </span>
                      <span className="text-gray-600 dark:text-gray-400">{profile.location}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">Email: </span>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                </div>
                {profile.image && (
                  <div className="flex justify-center lg:justify-end">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-64 h-64 rounded-2xl object-cover shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {skill.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Work Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.position}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                      {exp.start_date} - {exp.end_date || 'Present'}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {exp.description}
                  </p>
                  {exp.achievements && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Key Achievements:
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {exp.achievements}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
