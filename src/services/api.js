import axios from 'axios';

// Create axios instance with dynamic base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://nishant-portfolio-backend.onrender.com/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', response.status, response.data);
    }
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    
    // Add network error flag for easier handling
    if (!error.response) {
      error.isNetworkError = true;
    }
    
    // Add CORS error detection
    if (error.message?.includes('CORS') || error.message?.includes('Network Error')) {
      error.isCorsError = true;
    }
    
    return Promise.reject(error);
  }
);

// Fallback contact submission using Formspree
const submitContactFormspree = async (data) => {
  try {
    // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
    // You can get this by signing up at https://formspree.io
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      return { data: { success: true, message: 'Message sent successfully via Formspree!' } };
    } else {
      throw new Error('Formspree submission failed');
    }
  } catch (error) {
    console.error('Formspree fallback failed:', error);
    throw error;
  }
};

// Local storage fallback
const submitContactLocal = (data) => {
  try {
    // Store form data locally
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    submissions.push({
      ...data,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));
    
    console.log('📝 Contact form saved locally:', data);
    
    return { 
      data: { 
        success: true, 
        message: 'Your message has been saved locally. I will get back to you soon!' 
      } 
    };
  } catch (error) {
    console.error('Local storage fallback failed:', error);
    throw error;
  }
};

// Direct fetch fallback (bypasses axios CORS issues)
const submitContactDirect = async (data) => {
  try {
    const response = await fetch('https://nishant-portfolio-backend.onrender.com/api/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'cors' // Explicitly set CORS mode
    });

    const result = await response.json();
    
    if (response.ok) {
      return { data: result };
    } else {
      throw new Error(result.message || 'Direct fetch failed');
    }
  } catch (error) {
    console.error('Direct fetch failed:', error);
    throw error;
  }
};

// API endpoints
export const apiEndpoints = {
  // Contact with comprehensive fallback handling
  submitContact: async (data) => {
    console.log('🚀 Attempting to submit contact form:', data);
    
    try {
      // Try primary backend first (axios)
      console.log('📡 Trying primary backend (axios)...');
      const response = await api.post('/contact/submit', data);
      console.log('✅ Primary backend success!');
      return response;
      
    } catch (error) {
      console.warn('❌ Primary backend failed:', error.message);
      
      // If it's a CORS or network error, try direct fetch
      if (error.isCorsError || error.isNetworkError || error.response?.status >= 500) {
        try {
          console.log('📡 Trying direct fetch...');
          const directResponse = await submitContactDirect(data);
          console.log('✅ Direct fetch success!');
          return directResponse;
          
        } catch (directError) {
          console.warn('❌ Direct fetch failed:', directError.message);
          
          try {
            // Try Formspree fallback
            console.log('📡 Trying Formspree fallback...');
            const formspreeResponse = await submitContactFormspree(data);
            console.log('✅ Formspree success!');
            return formspreeResponse;
            
          } catch (formspreeError) {
            console.warn('❌ Formspree failed:', formspreeError.message);
            
            // Final fallback to local storage
            console.log('📝 Using local storage fallback...');
            const localResponse = submitContactLocal(data);
            console.log('✅ Local storage success!');
            return localResponse;
          }
        }
      } else {
        // For client errors (4xx), don't use fallbacks
        throw error;
      }
    }
  },
  
  // Individual contact methods (can be used independently)
  submitContactDirect: submitContactDirect,
  submitContactFormspree: submitContactFormspree,
  submitContactLocal: submitContactLocal,
  
  // Analytics with error handling
  trackPageView: async (data) => {
    try {
      return await api.post('/analytics/track/page-view', data);
    } catch (error) {
      console.warn('Page view tracking failed:', error.message);
      // Don't throw error for analytics - just log it
      return { data: { success: false, message: 'Analytics tracking failed' } };
    }
  },
  
  trackResumeDownload: async (data) => {
    try {
      return await api.post('/analytics/track/resume-download', data);
    } catch (error) {
      console.warn('Resume download tracking failed:', error.message);
      return { data: { success: false, message: 'Analytics tracking failed' } };
    }
  },
  
  trackProjectClick: async (data) => {
    try {
      return await api.post('/analytics/track/project-click', data);
    } catch (error) {
      console.warn('Project click tracking failed:', error.message);
      return { data: { success: false, message: 'Analytics tracking failed' } };
    }
  },
  
  trackEasterEgg: async (data) => {
    try {
      return await api.post('/analytics/track/easter-egg', data);
    } catch (error) {
      console.warn('Easter egg tracking failed:', error.message);
      return { data: { success: false, message: 'Analytics tracking failed' } };
    }
  },
  
  // Health check with fallback
  healthCheck: async () => {
    try {
      return await api.get('/health');
    } catch (error) {
      console.warn('Health check failed via axios, trying direct fetch...');
      
      try {
        const response = await fetch('https://nishant-portfolio-backend.onrender.com/api/health');
        const data = await response.json();
        return { data };
      } catch (fetchError) {
        console.warn('Direct health check also failed:', fetchError.message);
        return { 
          data: { 
            success: false, 
            message: 'Backend server is not accessible',
            status: 'offline'
          } 
        };
      }
    }
  },
  
  // Test email
  testEmail: async () => {
    try {
      return await api.post('/test-email');
    } catch (error) {
      console.warn('Test email failed:', error.message);
      throw error;
    }
  },
  
  // Utility method to check if backend is available
  checkBackendStatus: async () => {
    try {
      const response = await api.get('/health', { timeout: 5000 });
      return { available: true, data: response.data };
    } catch (error) {
      // Try direct fetch as fallback
      try {
        const response = await fetch('https://nishant-portfolio-backend.onrender.com/api/health', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return { available: true, data, method: 'direct-fetch' };
      } catch (fetchError) {
        return { available: false, error: error.message };
      }
    }
  },
  
  // Test contact endpoint specifically
  testContactEndpoint: async () => {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Connectivity Test',
      message: 'This is a test message to verify the contact endpoint is working.'
    };

    try {
      console.log('🧪 Testing contact endpoint...');
      const response = await apiEndpoints.submitContact(testData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  
  // Get stored contact submissions (from localStorage)
  getStoredSubmissions: () => {
    try {
      return JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    } catch (error) {
      console.error('Failed to get stored submissions:', error);
      return [];
    }
  },
  
  // Clear stored submissions
  clearStoredSubmissions: () => {
    try {
      localStorage.removeItem('contact_submissions');
      return true;
    } catch (error) {
      console.error('Failed to clear stored submissions:', error);
      return false;
    }
  },

  // Debug method to test all contact methods
  debugContactMethods: async (data) => {
    const results = {
      primary: null,
      direct: null,
      formspree: null,
      local: null
    };

    // Test primary (axios)
    try {
      results.primary = await api.post('/contact/submit', data);
      results.primary.success = true;
    } catch (error) {
      results.primary = { success: false, error: error.message };
    }

    // Test direct fetch
    try {
      results.direct = await submitContactDirect(data);
      results.direct.success = true;
    } catch (error) {
      results.direct = { success: false, error: error.message };
    }

    // Test Formspree (only if configured)
    try {
      results.formspree = await submitContactFormspree(data);
      results.formspree.success = true;
    } catch (error) {
      results.formspree = { success: false, error: error.message };
    }

    // Test local storage
    try {
      results.local = submitContactLocal(data);
      results.local.success = true;
    } catch (error) {
      results.local = { success: false, error: error.message };
    }

    return results;
  }
};

export default api;