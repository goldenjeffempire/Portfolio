import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// 404 Page component
const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Page not found</p>
      <a 
        href="/" 
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Go Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <ScrollToTop />
            <Navbar />

            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
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