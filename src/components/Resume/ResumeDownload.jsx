import React, { useState } from 'react';
import './ResumeDownload.css';

const ResumeDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    
    try {
      // Create download link
      const link = document.createElement('a');
      link.href = '/documents/Nishant_Thakur_Resume.pdf';
      link.download = 'Nishant_Thakur_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download failed:', error);
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