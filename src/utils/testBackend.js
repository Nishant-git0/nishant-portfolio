import { apiEndpoints } from '../services/api';

export const testBackendConnection = async () => {
  console.log('🧪 Testing backend connection...');
  
  try {
    // Test health check
    const healthResponse = await apiEndpoints.healthCheck();
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test page view tracking
    const viewResponse = await apiEndpoints.trackPageView({
      sessionId: 'test_session',
      metadata: { test: true }
    });
    console.log('✅ Page view tracking works:', viewResponse.data);
    
    console.log('🎉 All backend tests passed!');
    return true;
  } catch (error) {
    console.error('❌ Backend test failed:', error);
    return false;
  }
};

// Run test in development
if (process.env.NODE_ENV === 'development') {
  // Uncomment to run test on app load
  // testBackendConnection();
}