import React, { useState } from 'react';

const EasterEggTrigger = ({ onTrigger }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 10) {
      onTrigger('🎪 You found the hidden clicker! Amazing persistence! 🏆', 'click');
      setClickCount(0);
    }

    // Reset count after 3 seconds of no clicks
    setTimeout(() => {
      setClickCount(0);
    }, 3000);
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        width: '40px',
        height: '40px',
        background: 'transparent',
        border: '2px dashed rgba(99, 102, 241, 0.3)',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        color: 'var(--primary)',
        transition: 'all 0.3s ease',
        opacity: clickCount > 0 ? 1 : 0.3,
        transform: `scale(${1 + clickCount * 0.1})`,
        zIndex: 1000
      }}
      title="Click me multiple times..."
    >
      🎯
    </div>
  );
};

export default EasterEggTrigger;