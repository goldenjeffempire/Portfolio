import React from 'react'
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Heart, Code2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Footer = () => {
  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com/jefferyemuodafevwar', 
      color: 'hover:text-neutral-900 dark:hover:text-white',
      hoverBg: 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://linkedin.com/in/jeffery-emuodafevwar', 
      color: 'hover:text-blue-600',
      hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      url: 'https://twitter.com/jefferyemuoda', 
      color: 'hover:text-blue-400',
      hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    { 
      name: 'Email', 
      icon: Mail, 
      url: 'mailto:jeffemuodafe124@gmail.com', 
      color: 'hover:text-red-500',
      hoverBg: 'hover:bg-red-50 dark:hover:bg-red-900/20'
    },
  ]

  const quickLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects', icon: Code2 },
    { name: 'Contact', path: '/contact' },
  ]

  const technologies = [
    'React', 'Django', 'Python', 'JavaScript', 'PostgreSQL', 'Tailwind CSS'
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
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="pattern-dots" />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent" />

      <div className="relative z-10">
        <div className="section-container section-padding-sm">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-12"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-3xl flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-2xl">JE</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">
                    Jeffery Onome Emuodafevware
                  </h3>
                  <p className="text-primary-400 font-medium">Full-Stack Software Engineer</p>
                </div>
              </div>
              
              <p className="text-neutral-300 mb-6 text-lg leading-relaxed">
                Crafting digital experiences with modern technologies. 
                Specializing in scalable web applications that bridge powerful backends with intuitive frontends.
              </p>

              {/* Technology Stack */}
              <div className="mb-8">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Code2 size={18} className="text-primary-400" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="skill-tag-secondary text-xs"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-neutral-400 transition-all duration-300 ${link.color} ${link.hoverBg} hover:scale-110 hover:shadow-glow`}
                    aria-label={link.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <link.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-primary-400" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      to={link.path} 
                      className="flex items-center space-x-3 text-neutral-400 hover:text-white transition-all duration-200 group"
                    >
                      {link.icon && (
                        <link.icon 
                          size={16} 
                          className="text-primary-400 group-hover:text-primary-300 transition-colors" 
                        />
                      )}
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Mail size={20} className="text-primary-400" />
                Get In Touch
              </h4>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center space-x-3 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
                    <Mail size={16} className="text-primary-400" />
                  </div>
                  <div>
                    <a 
                      href="mailto:jeffemuodafe124@gmail.com" 
                      className="text-neutral-300 hover:text-white transition-colors text-sm"
                    >
                      jeffemuodafe124@gmail.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-3 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
                    <Phone size={16} className="text-primary-400" />
                  </div>
                  <span className="text-neutral-300 text-sm">+234 8052587419</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-3 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/20">
                    <MapPin size={16} className="text-primary-400" />
                  </div>
                  <span className="text-neutral-300 text-sm">Lagos, Nigeria</span>
                </motion.div>

                <div className="mt-6 p-4 rounded-xl bg-success-500/10 border border-success-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
                    <span className="text-success-400 font-medium text-sm">Available for work</span>
                  </div>
                  <p className="text-neutral-400 text-xs">
                    Open to freelance projects and full-time opportunities
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border-t border-white/10 mt-16 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-neutral-400 text-sm">
                  &copy; {new Date().getFullYear()} Jeffery Onome Emuodafevware. All rights reserved.
                </p>
                <p className="text-neutral-500 text-xs mt-1 flex items-center justify-center md:justify-start gap-1">
                  Built with <Heart size={12} className="text-red-500 animate-pulse" /> using React & Django
                </p>
              </div>
              
              <div className="flex items-center space-x-6 text-xs text-neutral-500">
                <Link to="/privacy" className="hover:text-neutral-300 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-neutral-300 transition-colors">
                  Terms of Service
                </Link>
                <a 
                  href="/sitemap.xml" 
                  className="hover:text-neutral-300 transition-colors"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JE</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                Jeffery Emuodafevware
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Full Stack Developer passionate about creating impactful digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </a>
              <a href="/about" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About
              </a>
              <a href="/projects" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Projects
              </a>
              <a href="/contact" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Connect</h3>
            <div className="space-y-2">
              <a 
                href="mailto:jeffemuodafe124@gmail.com" 
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail size={16} />
                <span>jeffemuodafe124@gmail.com</span>
              </a>
            </div>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://github.com/jefferyemuodafevwar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/jeffery-emuodafevwar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Jeffery Emuodafevware. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
              Made with <Heart size={16} className="mx-1 text-red-500" /> using React & Django
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
