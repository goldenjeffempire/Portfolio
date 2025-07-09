
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { portfolioApi, handleApiError } from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    success: false,
    error: null
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear form error
    if (formStatus.error) {
      setFormStatus(prev => ({
        ...prev,
        error: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'subject') { // Subject is optional
        const error = validateField(key, formData[key]);
        if (error) errors[key] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFormStatus({
      isSubmitting: true,
      success: false,
      error: null
    });

    try {
      await portfolioApi.submitContact(formData);
      
      setFormStatus({
        isSubmitting: false,
        success: true,
        error: null
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({
          ...prev,
          success: false
        }));
      }, 5000);

    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        success: false,
        error: handleApiError(error)
      });
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'jeffery@portfolio.com',
      href: 'mailto:jeffery@portfolio.com',
      color: 'text-blue-600'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'text-green-600'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#',
      color: 'text-red-600'
    }
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      label: 'GitHub',
      href: 'https://github.com/jeffery',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/jeffery',
      color: 'hover:text-blue-600'
    },
    {
      icon: FiTwitter,
      label: 'Twitter',
      href: 'https://twitter.com/jeffery',
      color: 'hover:text-blue-400'
    }
  ];

  const InputField = ({ label, name, type = 'text', required = false, as = 'input' }) => {
    const Component = as;
    const hasError = fieldErrors[name];
    
    return (
      <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Component
          id={name}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleInputChange}
          required={required}
          rows={as === 'textarea' ? 5 : undefined}
          className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 resize-none
            ${hasError 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500'
            }
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            placeholder-gray-500 dark:placeholder-gray-400`}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
        {hasError && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <FiAlertCircle className="w-4 h-4" />
            {hasError}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Send me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Follow Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 text-gray-600 dark:text-gray-400 ${social.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send Message
            </h2>

            {/* Success Message */}
            {formStatus.success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
              >
                <div className="flex items-center gap-2 text-green-800 dark:text-green-400">
                  <FiCheck className="w-5 h-5" />
                  <p className="font-medium">Message sent successfully!</p>
                </div>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {formStatus.error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <div className="flex items-center gap-2 text-red-800 dark:text-red-400">
                  <FiAlertCircle className="w-5 h-5" />
                  <p className="font-medium">Failed to send message</p>
                </div>
                <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                  {formStatus.error}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <InputField label="Name" name="name" required />
                <InputField label="Email" name="email" type="email" required />
              </div>
              
              <InputField label="Subject" name="subject" />
              <InputField label="Message" name="message" as="textarea" required />

              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={formStatus.isSubmitting}
                loading={formStatus.isSubmitting}
                leftIcon={!formStatus.isSubmitting && <FiSend />}
              >
                {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
