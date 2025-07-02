import { useEffect, useState } from 'react';

export const useEasterEggs = () => {
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');

  useEffect(() => {
    // Konami Code: ↑↑↓↓←→←→BA
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let userInput = [];
    let clickCount = 0;
    let clickTimer = null;
    let secretWordBuffer = '';

    const showEasterEgg = (message, type = 'konami') => {
      console.log('Easter egg triggered:', message);
      setSecretMessage(message);
      setEasterEggActive(true);
      
      // Add special effects
      document.body.classList.add(`easter-egg-${type}`);
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setEasterEggActive(false);
        document.body.classList.remove(`easter-egg-${type}`);
        setSecretMessage('');
      }, 5000);
    };

    const handleKeyDown = (e) => {
      // Konami Code Detection
      userInput.push(e.keyCode);
      if (userInput.length > konamiCode.length) {
        userInput.shift();
      }
      
      if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
        showEasterEgg('🎉 Konami Code Activated! You are a true gamer! 🎮', 'konami');
        userInput = [];
        return;
      }

      // Secret word detection
      if (e.key && e.key.length === 1) {
        secretWordBuffer += e.key.toLowerCase();
        
        // Keep only last 10 characters
        if (secretWordBuffer.length > 10) {
          secretWordBuffer = secretWordBuffer.slice(-10);
        }

        // Check for secret words
        if (secretWordBuffer.includes('nishant')) {
          showEasterEgg('👨‍💻 You typed my name! Thanks for paying attention! 🙏', 'click');
          secretWordBuffer = '';
        } else if (secretWordBuffer.includes('developer')) {
          showEasterEgg('💻 Developer mode activated! You know the magic word! ⚡', 'click');
          secretWordBuffer = '';
        } else if (secretWordBuffer.includes('portfolio')) {
          showEasterEgg('📁 Portfolio explorer! You are really engaged! 🔍', 'click');
          secretWordBuffer = '';
        } else if (secretWordBuffer.includes('secret')) {
          showEasterEgg('🤫 Shh... you found the secret word! Well done! 🕵️', 'click');
          secretWordBuffer = '';
        }
      }

      // Special key combinations
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        showEasterEgg('🔧 Developer tools detected! You know your way around! 👨‍💻', 'click');
      }
    };

    const handleLogoClick = (e) => {
      e.preventDefault();
      clickCount++;
      
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
      
      clickTimer = setTimeout(() => {
        if (clickCount >= 7) {
          showEasterEgg('🚀 Logo master! You discovered the click combo! 💫', 'click');
        } else if (clickCount >= 3) {
          console.log(`${clickCount} clicks... keep going!`);
        }
        clickCount = 0;
      }, 2000);
    };

    // Double-click anywhere easter egg
    let lastClickTime = 0;
    const handleDoubleClick = (e) => {
      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime < 300) {
        if (Math.random() < 0.1) { // 10% chance
          showEasterEgg('⚡ Lightning fast! You triggered a rare double-click easter egg! 🎯', 'click');
        }
      }
      lastClickTime = currentTime;
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleDoubleClick);

    // Add logo click listener
    const addLogoListener = () => {
      const logo = document.querySelector('.logo');
      if (logo) {
        logo.addEventListener('click', handleLogoClick);
        logo.style.cursor = 'pointer';
        logo.title = 'Click me multiple times...';
      } else {
        setTimeout(addLogoListener, 1000);
      }
    };

    addLogoListener();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleDoubleClick);
      
      const logo = document.querySelector('.logo');
      if (logo) {
        logo.removeEventListener('click', handleLogoClick);
      }
    };
  }, []);

  return { easterEggActive, secretMessage };
};