import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Clock,
  MessageSquare,
  User,
  Calendar,
  Globe,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  ArrowRight,
  Zap,
  Coffee,
  Code2,
  Heart
} from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Thank you for your message! I\'ll get back to you within 24 hours.'
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or contact me directly.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'jeffemuodafe124@gmail.com',
      href: 'mailto:jeffemuodafe124@gmail.com',
      color: 'text-primary-600 dark:text-primary-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+234 8052587419',
      href: 'tel:+2348052587419',
      color: 'text-accent-600 dark:text-accent-400'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Lagos, Nigeria',
      href: '#',
      color: 'text-secondary-600 dark:text-secondary-400'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24 hours',
      href: '#',
      color: 'text-success-600 dark:text-success-400'
    }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/jefferyemuodafevwar',
      color: 'hover:text-neutral-900 dark:hover:text-white',
      description: 'View my code and projects'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/jeffery-emuodafevwar',
      color: 'hover:text-blue-600',
      description: 'Professional networking'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/jeffery_onome',
      color: 'hover:text-blue-400',
      description: 'Latest updates and thoughts'
    }
  ]

  const workingHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM WAT' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM WAT' },
    { day: 'Sunday', hours: 'Emergency projects only' }
  ]

  const services = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'End-to-end web application development with modern technologies.',
      features: ['React/Next.js Frontend', 'Django/FastAPI Backend', 'Database Design', 'API Development']
    },
    {
      icon: Zap,
      title: 'AI Integration',
      description: 'Custom AI solutions and machine learning implementations.',
      features: ['OpenAI API Integration', 'Custom ML Models', 'NLP Solutions', 'Computer Vision']
    },
    {
      icon: Globe,
      title: 'Consulting',
      description: 'Technical consultation and architecture planning.',
      features: ['System Architecture', 'Performance Optimization', 'Code Review', 'Team Training']
    }
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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 mb-16"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <MessageSquare size={16} className="mr-2" />
              Let's Build Something Amazing Together
            </motion.div>
            
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-neutral-100">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Ready to bring your ideas to life? I'm here to help you build scalable, 
              intelligent applications that drive real business value. Let's discuss your project!
            </p>

            <div className="flex items-center justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">24h</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">35+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">100%</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Send me a message
                </h2>

                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl mb-6 flex items-center space-x-3 ${
                      status.type === 'success'
                        ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300'
                        : 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-300'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>{status.message}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="textarea"
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Quick Contact */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Prefer direct contact?
                </h3>
                <div className="flex items-center space-x-4">
                  <motion.a
                    href="mailto:jeffemuodafe124@gmail.com"
                    className="btn-outline flex-1 py-3 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail size={18} />
                    <span>Email Me</span>
                  </motion.a>
                  <motion.a
                    href="tel:+2348052587419"
                    className="btn-outline flex-1 py-3 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone size={18} />
                    <span>Call Me</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <item.icon size={24} className={item.color} />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.label}</p>
                        {item.href && item.href !== '#' ? (
                          <a
                            href={item.href}
                            className="text-neutral-900 dark:text-neutral-100 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-neutral-900 dark:text-neutral-100 font-medium">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="card p-8">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center space-x-2">
                  <Clock size={20} className="text-primary-600 dark:text-primary-400" />
                  <span>Working Hours</span>
                </h3>
                <div className="space-y-3">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0">
                      <span className="text-neutral-600 dark:text-neutral-400">{schedule.day}</span>
                      <span className="text-neutral-900 dark:text-neutral-100 font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
                  <p className="text-success-700 dark:text-success-300 text-sm flex items-center space-x-2">
                    <Coffee size={16} />
                    <span>Always available for urgent projects!</span>
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="card p-8">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Connect with me
                </h3>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-4 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-300 group ${social.color}`}
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <social.icon size={20} />
                      <div className="flex-1">
                        <p className="font-medium text-neutral-900 dark:text-neutral-100">{social.name}</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{social.description}</p>
                      </div>
                      <ExternalLink size={16} className="text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-neutral-100/50 dark:bg-neutral-800/50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              How I Can <span className="text-gradient">Help You</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              From concept to deployment, I provide comprehensive development services 
              tailored to your specific needs and business goals.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="card p-8 hover-lift text-center"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-2xl flex items-center justify-center">
                  <service.icon size={32} className="text-primary-600 dark:text-primary-400" />
                </div>
                
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <CheckCircle size={16} className="text-success-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
              Let's transform your ideas into reality. I'm excited to hear about your project 
              and discuss how we can work together to achieve your goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#contact-form"
              className="bg-white text-primary-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-neutral-100 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('form').scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>Get Started Today</span>
              <ArrowRight size={20} />
            </motion.a>
            
            <motion.a
              href="mailto:jeffemuodafe124@gmail.com"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-900 transition-all flex items-center space-x-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              <span>Email Directly</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center space-x-2 text-neutral-300"
          >
            <Heart size={16} className="text-red-400" />
            <span className="text-sm">
              Made with passion for creating amazing digital experiences
            </span>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage