import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '../types/auth';
import { apiClient } from '../lib/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = apiClient.getToken();
      if (!token) {
        setState(prev => ({ ...prev, loading: false }));
        return;
      }

      const response = await apiClient.getProfile();
      setState(prev => ({
        ...prev,
        user: {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          created_at: response.user.createdAt,
        },
        loading: false,
      }));
    } catch (error: any) {
      console.error('Auth check failed:', error);
      apiClient.logout();
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await apiClient.signup(name, email, password);
      
      setState(prev => ({
        ...prev,
        user: {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          created_at: response.user.createdAt,
        },
        loading: false,
      }));
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
      toast.error(error.message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await apiClient.login(email, password);
      
      setState(prev => ({
        ...prev,
        user: {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          created_at: response.user.createdAt,
        },
        loading: false,
      }));
      
      toast.success('Welcome back!');
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
      toast.error(error.message);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    toast.error('Google OAuth not implemented yet. Please use email/password.');
  };

  const signOut = async () => {
    try {
      apiClient.logout();
      setState(prev => ({
        ...prev,
        user: null,
        error: null,
      }));
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error('Error signing out');
    }
  };

  const value: AuthContextType = {
    ...state,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}