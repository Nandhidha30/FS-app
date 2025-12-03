import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token
      axios.get('http://localhost:5000/api/auth/me')
        .then(res => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: res.data.user, token }
          });
        })
        .catch(() => {
          dispatch({ type: 'LOGOUT' });
        });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = () => {
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};