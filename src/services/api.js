import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      // Redirect to login if needed
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  // Analytics
  trackPageView: (data) => api.post('/analytics/track/page-view', data),
  trackResumeDownload: (data) => api.post('/analytics/track/resume-download', data),
  trackProjectClick: (data) => api.post('/analytics/track/project-click', data),
  trackEasterEgg: (data) => api.post('/analytics/track/easter-egg', data),
  
  // Contact
  submitContact: (data) => api.post('/contact/submit', data),
  
  // Auth
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  
  // Health check
  healthCheck: () => api.get('/health')
};

export default api;