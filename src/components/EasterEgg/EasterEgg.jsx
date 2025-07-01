import React, { useState } from 'react';
import { useEasterEggs } from '../../hooks/useEasterEggs';
import './EasterEgg.css';

const EasterEggInstructions = () => {
  const [showHints, setShowHints] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      zIndex: 1000
    }}>
      <button
        onClick={() => setShowHints(!showHints)}
        style={{
          background: 'rgba(99, 102, 241, 0.2)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          color: 'var(--primary)',
          cursor: 'pointer',
          fontSize: '1.2rem',
          transition: 'all 0.3s ease'
        }}
        title="Easter Egg Hints"
      >
        💡
      </button>
      
      {showHints && (
        <div style={{
          position: 'absolute',
          bottom: '50px',
          right: '0',
          background: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '12px',
          padding: '15px',
          minWidth: '200px',
          color: 'var(--light)',
          fontSize: '0.85rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'var(--primary)' }}>
            🎮 Easter Eggs:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '15px', lineHeight: '1.4' }}>
            <li>Konami Code: ↑↑↓↓←→←→BA</li>
            <li>Click the logo 7+ times quickly</li>
            <li>Type: "nishant", "developer", "secret"</li>
            <li>Press Ctrl+Shift+I</li>
            <li>Double-click anywhere (10% chance)</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const EasterEgg = () => {
  const { easterEggActive, secretMessage } = useEasterEggs();

  const handleClose = () => {
    // Force close by removing body classes
    document.body.classList.remove('easter-egg-konami', 'easter-egg-click');
  };

  if (!easterEggActive) {
    return <EasterEggInstructions />;
  }

  return (
    <>
      <EasterEggInstructions />
      
      <div className="easter-egg-overlay" onClick={handleClose}>
        <div className="easter-egg-modal" onClick={(e) => e.stopPropagation()}>
          <div className="easter-egg-content">
            <div className="easter-egg-icon">
              <i className="fas fa-magic"></i>
            </div>
            <h3>Secret Unlocked!</h3>
            <p>{secretMessage}</p>
            <div className="easter-egg-close" onClick={handleClose}>
              <i className="fas fa-times"></i>
            </div>
            <div className="easter-egg-animation">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EasterEgg;