import { useState, useEffect } from 'react';
import { apiEndpoints } from '../services/api';

export const usePageViews = () => {
  const [views, setViews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Generate or get session ID
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
          sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          sessionStorage.setItem('sessionId', sessionId);
        }

        // Track page view
        const response = await apiEndpoints.trackPageView({
          sessionId,
          metadata: {
            page: 'portfolio',
            timestamp: new Date().toISOString()
          }
        });

        if (response.data.success) {
          setViews(response.data.data.totalViews);
        }

      } catch (error) {
        console.error('Error tracking page view:', error);
        // Fallback to localStorage
        const storedViews = localStorage.getItem('portfolio-views');
        const currentViews = storedViews ? parseInt(storedViews) : 0;
        const newViews = currentViews + 1;
        localStorage.setItem('portfolio-views', newViews.toString());
        setViews(newViews);
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