import React, { useState, useEffect } from 'react';
import { apiEndpoints } from '../../services/api';

const HealthCheck = () => {
  const [status, setStatus] = useState('checking');
  const [backendInfo, setBackendInfo] = useState(null);

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const response = await apiEndpoints.healthCheck();
        if (response.data.status === 'OK') {
          setStatus('connected');
          setBackendInfo(response.data);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Backend health check failed:', error);
        setStatus('disconnected');
      }
    };

    checkBackendHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkBackendHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }
 /*
  const getStatusColor = () => {
    switch (status) {
      case 'connected': return '#22c55e';
      case 'disconnected': return '#ef4444';
      case 'error': return '#f59e0b';
      default: return '#6b7280';
    }
  };

    const getStatusText = () => {
    switch (status) {
      case 'connected': return 'Backend Connected';
      case 'disconnected': return 'Backend Disconnected';
      case 'error': return 'Backend Error';
      default: return 'Checking...';
    }
  }; 

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: getStatusColor()
      }}></div>
      <span>{getStatusText()}</span> 
      {backendInfo && (
        <span style={{ opacity: 0.7 }}>
          (v{backendInfo.version})
        </span>
      )}
    </div>
  ); */
}; 

export default HealthCheck;