import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import PageViews from './components/PageViews/PageViews';
import EasterEgg from './components/EasterEgg/EasterEgg';
import HealthCheck from './components/HealthCheck/HealthCheck';
import './App.css';

// Main Portfolio Component
const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="App">
      <HealthCheck />

      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {!isLoading && (
        <>
          <PageViews />
          <Header />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
          <EasterEgg />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          {/* Catch all route */}
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;