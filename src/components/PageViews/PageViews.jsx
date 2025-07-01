import React from 'react';
import { usePageViews } from '../../hooks/usePageViews';
import './PageViews.css';

const PageViews = () => {
  const { views, isLoading } = usePageViews();

  const formatViews = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="page-views">
      <div className="views-container">
        <i className="fas fa-eye" aria-hidden="true"></i>
        <span className="views-count">
          {isLoading ? (
            <span className="loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          ) : (
            formatViews(views)
          )}
        </span>
        <span className="views-label">
          {views === 1 ? 'view' : 'views'}
        </span>
      </div>
    </div>
  );
};

export default PageViews;