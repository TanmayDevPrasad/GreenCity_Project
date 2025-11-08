import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem('user');
    const storedOrg = localStorage.getItem('organization');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    
    if (storedOrg) {
      try {
        setOrganization(JSON.parse(storedOrg));
      } catch (e) {
        localStorage.removeItem('organization');
      }
    }
    
    setLoading(false);
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const loginOrganization = (orgData) => {
    setOrganization(orgData);
    localStorage.setItem('organization', JSON.stringify(orgData));
  };

  const logout = () => {
    setUser(null);
    setOrganization(null);
    localStorage.removeItem('user');
    localStorage.removeItem('organization');
  };

  const value = {
    user,
    organization,
    loginUser,
    loginOrganization,
    logout,
    isAuthenticated: !!user || !!organization,
    isUser: !!user,
    isOrganization: !!organization,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

