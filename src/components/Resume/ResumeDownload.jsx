import React, { useState } from 'react';
import { apiEndpoints } from '../../services/api';
import './ResumeDownload.css';

const ResumeDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Track download
      const sessionId = sessionStorage.getItem('sessionId') || `session_${Date.now()}`;
      
      await apiEndpoints.trackResumeDownload({
        sessionId,
        metadata: {
          downloadTime: new Date().toISOString()
        }
      });

      // Create download link
      const link = document.createElement('a');
      link.href = '/documents/Nishant_Thakur_Resume.pdf';
      link.download = 'Nishant_Thakur_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download tracking failed:', error);
      // Still allow download even if tracking fails
      const link = document.createElement('a');
      link.href = '/documents/Nishant_Thakur_Resume.pdf';
      link.download = 'Nishant_Thakur_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  return (
    <button 
      onClick={handleDownload}
      disabled={isDownloading}
      className={`resume-download-btn ${isDownloading ? 'downloading' : ''}`}
      aria-label="Download resume"
    >
      {isDownloading ? (
        <>
          <i className="fas fa-spinner fa-spin"></i>
          Downloading...
        </>
      ) : (
        <>
          <i className="fas fa-download"></i>
          Download Resume
        </>
      )}
    </button>
  );
};

export default ResumeDownload;