import axios from 'axios';

// Create axios instance with dynamic base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
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
    
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      if (window.location.pathname.includes('/admin')) {
        window.location.reload();
      }
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  // Contact
  submitContact: (data) => api.post('/contact/submit', data),
  
  // Analytics
  trackPageView: (data) => api.post('/analytics/track/page-view', data),
  trackResumeDownload: (data) => api.post('/analytics/track/resume-download', data),
  trackProjectClick: (data) => api.post('/analytics/track/project-click', data),
  trackEasterEgg: (data) => api.post('/analytics/track/easter-egg', data),
  
  // ✅ Admin endpoints
  adminLogin: (data) => api.post('/admin/login', data),
  getDashboard: () => api.get('/admin/dashboard'),
  getContacts: (params) => api.get('/admin/contacts', { params }),
  getContact: (id) => api.get(`/admin/contacts/${id}`),
  updateContactStatus: (id, data) => api.patch(`/admin/contacts/${id}/status`, data),
  deleteContact: (id) => api.delete(`/admin/contacts/${id}`),
  
  // Health check & Email
  healthCheck: () => api.get('/health'),
  testEmail: () => api.post('/test-email')
};

export default api;