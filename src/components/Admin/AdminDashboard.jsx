import React, { useState, useEffect } from 'react';
import { apiEndpoints } from '../../services/api'; // ✅ Import your API service
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [dashboardData, setDashboardData] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [emailTestResult, setEmailTestResult] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ Use apiEndpoints instead of fetch
      const response = await apiEndpoints.adminLogin(loginData);
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.data.token);
        setIsAuthenticated(true);
        fetchDashboardData();
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      // ✅ Use apiEndpoints
      const response = await apiEndpoints.getDashboard();
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      // ✅ Use apiEndpoints
      const response = await apiEndpoints.getContacts();
      setContacts(response.data.data.contacts);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  const handleContactClick = async (contactId) => {
    try {
      // ✅ Use apiEndpoints
      const response = await apiEndpoints.getContact(contactId);
      setSelectedContact(response.data.data);
    } catch (error) {
      console.error('Failed to fetch contact details:', error);
    }
  };

  const updateContactStatus = async (contactId, status) => {
    try {
      // ✅ Use apiEndpoints
      await apiEndpoints.updateContactStatus(contactId, { status });
      fetchContacts();
      if (selectedContact && selectedContact._id === contactId) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (error) {
      console.error('Failed to update contact status:', error);
    }
  };

  const deleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      // ✅ Use apiEndpoints
      await apiEndpoints.deleteContact(contactId);
      fetchContacts();
      setSelectedContact(null);
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };

  const testEmail = async () => {
    setEmailTestResult('Sending test email...');
    try {
      // ✅ Use apiEndpoints
      const response = await apiEndpoints.testEmail();
      setEmailTestResult(response.data.success ? '✅ Test email sent successfully!' : '❌ ' + response.data.message);
    } catch (error) {
      setEmailTestResult('❌ Failed to send test email');
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setDashboardData(null);
    setContacts([]);
    setSelectedContact(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return '#ef4444';
      case 'read': return '#f59e0b';
      case 'replied': return '#22c55e';
      default: return '#6b7280';
    }
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-header">
            <h2>🔐 Admin Dashboard</h2>
            <p>Portfolio Management System</p>
          </div>
          
          <form onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label>📧 Email:</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                placeholder="truthking68@gmail.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label>🔑 Password:</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? '🔄 Logging in...' : '🚀 Login'}
            </button>
          </form>
          
          <div className="login-footer">
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>📊 Admin Dashboard</h1>
          <p>Portfolio Management System</p>
        </div>
        <div className="header-right">
          <button onClick={testEmail} className="test-email-btn">
            📧 Test Email
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>

      {emailTestResult && (
        <div className="email-test-result">
          {emailTestResult}
        </div>
      )}
      
      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📈 Dashboard
        </button>
        <button 
          className={`tab ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('contacts');
            fetchContacts();
          }}
        >
          📧 Contacts
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'dashboard' && dashboardData && (
          <div className="dashboard-overview">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📧</div>
                <div className="stat-content">
                  <h3>Total Contacts</h3>
                  <p className="stat-number">{dashboardData.totalContacts}</p>
                  <span className="stat-label">All time</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🆕</div>
                <div className="stat-content">
                  <h3>Recent Contacts</h3>
                  <p className="stat-number">{dashboardData.recentContacts}</p>
                  <span className="stat-label">Last 24 hours</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>Page Views</h3>
                  <p className="stat-number">{dashboardData.analytics.pageViews}</p>
                  <span className="stat-label">Total views</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📥</div>
                <div className="stat-content">
                  <h3>Downloads</h3>
                  <p className="stat-number">{dashboardData.analytics.downloads}</p>
                  <span className="stat-label">Resume downloads</span>
                </div>
              </div>
            </div>
            
            <div className="recent-contacts">
              <h3>📋 Latest Contacts</h3>
              {dashboardData.latestContacts && dashboardData.latestContacts.length > 0 ? (
                <div className="contacts-list">
                  {dashboardData.latestContacts.map(contact => (
                    <div key={contact._id} className="contact-item">
                      <div className="contact-info">
                        <h4>{contact.name}</h4>
                        <p>{contact.email}</p>
                        <p className="contact-subject">{contact.subject}</p>
                      </div>
                      <div className="contact-meta">
                        <span 
                          className="status-badge" 
                          style={{ backgroundColor: getStatusColor(contact.status) }}
                        >
                          {contact.status}
                        </span>
                        <span className="contact-date">
                          {formatDate(contact.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No contacts yet</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'contacts' && (
          <div className="contacts-management">
            <div className="contacts-header">
              <h3>📧 Contact Management</h3>
              <button onClick={fetchContacts} className="refresh-btn">
                🔄 Refresh
              </button>
            </div>
            
            <div className="contacts-layout">
              <div className="contacts-list-panel">
                {contacts.length > 0 ? (
                  contacts.map(contact => (
                    <div 
                      key={contact._id} 
                      className={`contact-card ${selectedContact?._id === contact._id ? 'selected' : ''}`}
                      onClick={() => handleContactClick(contact._id)}
                    >
                      <div className="contact-header">
                        <h4>{contact.name}</h4>
                        <span 
                          className="status-badge" 
                          style={{ backgroundColor: getStatusColor(contact.status) }}
                        >
                          {contact.status}
                        </span>
                      </div>
                      <p className="contact-email">{contact.email}</p>
                      <p className="contact-subject">{contact.subject}</p>
                      <p className="contact-date">{formatDate(contact.createdAt)}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No contacts found</p>
                )}
              </div>
              
              <div className="contact-details-panel">
                {selectedContact ? (
                  <div className="contact-details">
                    <div className="contact-details-header">
                      <h3>📧 Contact Details</h3>
                      <div className="contact-actions">
                        <select 
                          value={selectedContact.status}
                          onChange={(e) => updateContactStatus(selectedContact._id, e.target.value)}
                          className="status-select"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                        <button 
                          onClick={() => deleteContact(selectedContact._id)}
                          className="delete-btn"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className="contact-info-grid">
                      <div className="info-item">
                        <label>👤 Name:</label>
                        <span>{selectedContact.name}</span>
                      </div>
                      <div className="info-item">
                        <label>📧 Email:</label>
                        <span>
                          <a href={`mailto:${selectedContact.email}`}>
                            {selectedContact.email}
                          </a>
                        </span>
                      </div>
                      <div className="info-item">
                        <label>📝 Subject:</label>
                        <span>{selectedContact.subject}</span>
                      </div>
                      <div className="info-item">
                        <label>🕒 Received:</label>
                        <span>{formatDate(selectedContact.createdAt)}</span>
                      </div>
                      <div className="info-item">
                        <label>🌐 IP Address:</label>
                        <span>{selectedContact.ipAddress}</span>
                      </div>
                    </div>
                    
                    <div className="message-content">
                      <label>💬 Message:</label>
                      <div className="message-text">
                        {selectedContact.message}
                      </div>
                    </div>
                    <div className="reply-section">
                      <a 
                        href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                        className="reply-btn"
                      >
                        📧 Reply to {selectedContact.name}
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="no-selection">
                    <p>📧 Select a contact to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;