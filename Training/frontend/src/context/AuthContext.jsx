import React, { createContext, useState, useContext, useEffect } from 'react';
import { getToken, setToken, removeToken, parseJwt } from '../utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize and validate token on startup
  useEffect(() => {
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setUser({ email: decoded.sub });
      } else {
        // Token has expired or is invalid
        handleLogout();
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const handleLogout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
  };

  /**
   * Log in user using x-www-form-urlencoded form data required by OAuth2PasswordRequestForm
   */
  const login = async (email, password) => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Incorrect email or password');
    }

    const data = await response.json();
    setToken(data.access_token);
    setTokenState(data.access_token);
    const decoded = parseJwt(data.access_token);
    setUser({ email: decoded.sub });
    return data;
  };

  /**
   * Register a new user using JSON payload
   */
  const register = async (email, password) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Registration failed. Email might already exist.');
    }

    const data = await response.json();
    // Auto-login after successful registration
    return login(email, password);
  };

  /**
   * Wrapper for standard fetch that automatically adds the Authorization header if available.
   * Logs out automatically on receiving 401 Unauthorized responses.
   */
  const authFetch = async (url, options = {}) => {
    const headers = { ...options.headers };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const updatedOptions = { ...options, headers };
    const response = await fetch(url, updatedOptions);

    if (response.status === 401) {
      // Session expired or credentials invalid
      handleLogout();
      throw new Error('Your session has expired. Please log in again.');
    }

    return response;
  };

  const value = {
    token,
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout: handleLogout,
    authFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
