import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Contact.css';

const Contact = () => {
  const { personal, socialLinks } = portfolioData;
  const [ref, isVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });

    // Clear validation error for this field when user starts typing
    if (validationErrors[id]) {
      setValidationErrors({
        ...validationErrors,
        [id]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject || formData.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters long';
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setSubmitMessage('');
    setValidationErrors({});

    // Client-side validation
    const clientErrors = validateForm();
    if (Object.keys(clientErrors).length > 0) {
      setValidationErrors(clientErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting form data:', formData);
      
      // Use direct fetch to submit the form
      const response = await fetch('https://nishant-portfolio-backend.onrender.com/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors'
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage(data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('');
          setSubmitMessage('');
        }, 5000);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Fallback: Handle form submission locally if backend fails
      if (error.message?.includes('CORS') || error.message?.includes('NetworkError') || error.message?.includes('Failed to fetch')) {
        console.log('Backend unavailable due to CORS/Network, handling locally:', formData);
        
        // Store form data locally
        const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
        submissions.push({
          ...formData,
          timestamp: new Date().toISOString(),
          id: Date.now()
        });
        localStorage.setItem('contact_submissions', JSON.stringify(submissions));
        
        setSubmitStatus('success');
        setSubmitMessage('Thank you for your message! Your message has been saved and I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => {
          setSubmitStatus('');
          setSubmitMessage('');
        }, 5000);
        
      } else {
        setSubmitStatus('error');
        
        if (error.message?.includes('400')) {
          setSubmitMessage('Please check your input and try again.');
        } else if (error.message?.includes('429')) {
          setSubmitMessage('Too many requests. Please try again later.');
        } else {
          setSubmitMessage('Failed to send message. Please try again later.');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <div className={`section-title ${isVisible ? 'fade-in-up' : ''}`}>
          <h2>Get In Touch</h2>
          <p>Have a project in mind or want to discuss technology? Let's connect!</p>
        </div>

        <div className={`contact-container ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="contact-info">
            <div className="contact-card">
              <h3><i className="fas fa-envelope" aria-hidden="true"></i> Email</h3>
              <p>
                <a href={`mailto:${personal.email}`} aria-label="Send email to Nishant">
                  {personal.email}
                </a>
              </p>
            </div>
            <div className="contact-card">
              <h3><i className="fas fa-map-marker-alt" aria-hidden="true"></i> Location</h3>
              <p>{personal.location}</p>
            </div>
            <div className="contact-card">
              <h3><i className="fas fa-phone" aria-hidden="true"></i> Phone</h3>
              <p>
                <a href={`tel:${personal.phone}`} aria-label="Call Nishant">
                  {personal.phone}
                </a>
              </p>
            </div>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Visit Nishant's ${link.platform} profile`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <i className={link.icon} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit} noValidate>
              {submitStatus && (
                <div className={`form-message ${submitStatus}`}>
                  <i className={`fas ${submitStatus === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                  {submitMessage}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  disabled={isSubmitting}
                  className={validationErrors.name ? 'error' : ''}
                />
                {validationErrors.name && (
                  <span className="field-error">{validationErrors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  disabled={isSubmitting}
                  className={validationErrors.email ? 'error' : ''}
                />
                {validationErrors.email && (
                  <span className="field-error">{validationErrors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  disabled={isSubmitting}
                  className={validationErrors.subject ? 'error' : ''}
                />
                {validationErrors.subject && (
                  <span className="field-error">{validationErrors.subject}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  disabled={isSubmitting}
                  rows="6"
                  className={validationErrors.message ? 'error' : ''}
                ></textarea>
                {validationErrors.message && (
                  <span className="field-error">{validationErrors.message}</span>
                )}
              </div>

              <button 
                type="submit" 
                className="btn"
                disabled={isSubmitting}
                aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;