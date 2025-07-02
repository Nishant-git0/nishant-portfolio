import { useState, useEffect } from 'react';

export const usePageViews = () => {
  const [views, setViews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trackPageView = () => {
      try {
        // Generate or get session ID
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
          sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          sessionStorage.setItem('sessionId', sessionId);
        }

        // Use localStorage for view tracking
        const storedViews = localStorage.getItem('portfolio-views');
        const currentViews = storedViews ? parseInt(storedViews) : 0;
        const newViews = currentViews + 1;
        localStorage.setItem('portfolio-views', newViews.toString());
        setViews(newViews);

      } catch (error) {
        console.error('Error tracking page view:', error);
        setViews(1);
      } finally {
        setIsLoading(false);
      }
    };

    // Only track if this is a new session
    const sessionTracked = sessionStorage.getItem('view-tracked');
    if (!sessionTracked) {
      trackPageView();
      sessionStorage.setItem('view-tracked', 'true');
    } else {
      // Just get the current count
      const storedViews = localStorage.getItem('portfolio-views');
      setViews(storedViews ? parseInt(storedViews) : 1);
      setIsLoading(false);
    }
  }, []);

  return { views, isLoading };
};