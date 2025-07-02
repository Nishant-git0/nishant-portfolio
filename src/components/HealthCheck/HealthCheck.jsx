import React from 'react';

const HealthCheck = () => {
  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return null; // No health check functionality without backend
};

export default HealthCheck;