
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeProvider from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Helmet>
              <title>Jeffery Onome Emuodafevware - Full Stack Developer Portfolio</title>
              <meta name="description" content="Professional portfolio of Jeffery Onome Emuodafevware - Full Stack Developer specializing in React, Django, and modern web technologies." />
              <meta name="keywords" content="Full Stack Developer, React, Django, Python, JavaScript, Web Development, Portfolio" />
              <meta name="author" content="Jeffery Onome Emuodafevware" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              
              {/* Open Graph */}
              <meta property="og:title" content="Jeffery Onome Emuodafevware - Full Stack Developer" />
              <meta property="og:description" content="Professional portfolio showcasing full stack development projects and skills." />
              <meta property="og:type" content="website" />
              <meta property="og:url" content={window.location.href} />
              
              {/* Twitter Card */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Jeffery Onome Emuodafevware - Full Stack Developer" />
              <meta name="twitter:description" content="Professional portfolio showcasing full stack development projects and skills." />
              
              {/* Canonical URL */}
              <link rel="canonical" href={window.location.href} />
            </Helmet>
            
            <ScrollToTop />
            <Navbar />
            
            <main>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">Page not found</p>
                        <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                          Go Home
                        </a>
                      </div>
                    </div>
                  } />
                </Routes>
              </Suspense>
            </main>
            
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
