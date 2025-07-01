import React, { useState } from 'react';

const EasterEggInstructions = () => {
  const [showHints, setShowHints] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: '130px',
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
            <li>Try the Konami Code: ↑↑↓↓←→←→BA</li>
            <li>Click the logo 7+ times quickly</li>
            <li>Click the target 🎯 10 times</li>
            <li>Type: "nishant", "developer", "secret"</li>
            <li>Press Ctrl+Shift+I</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EasterEggInstructions;