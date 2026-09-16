import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthUser } from '../types';
import {
  SignInCredentials,
  SignUpCredentials,
  ConfirmPasswordResetRequest,
  AuthProviderConfigStatus
} from '../services/auth/authTypes';
import { authService, authConfigStatus } from '../services/auth/authService';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isConfigured: boolean;
  providerName: string;
  configStatus: AuthProviderConfigStatus;
  login: (credentials: SignInCredentials) => Promise<AuthUser>;
  signup: (credentials: SignUpCredentials) => Promise<AuthUser>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  confirmPasswordReset: (request: ConfirmPasswordResetRequest) => Promise<void>;
  updateUserProfile: (updates: Partial<AuthUser>) => Promise<AuthUser>;
  authError: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Listen to auth state transitions
    const unsubscribe = authService.onAuthStateChanged((activeUser) => {
      setUser(activeUser);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  const login = async (credentials: SignInCredentials): Promise<AuthUser> => {
    setLoading(true);
    setAuthError(null);
    try {
      const authUser = await authService.signIn(credentials);
      setUser(authUser);
      return authUser;
    } catch (err: any) {
      const message = err?.message || 'Login failed. Please verify credentials.';
      setAuthError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignUpCredentials): Promise<AuthUser> => {
    setLoading(true);
    setAuthError(null);
    try {
      const authUser = await authService.signUp(credentials);
      setUser(authUser);
      return authUser;
    } catch (err: any) {
      const message = err?.message || 'Registration failed. Please try again.';
      setAuthError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setAuthError(null);
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    setAuthError(null);
    try {
      await authService.sendPasswordResetEmail(email);
    } catch (err: any) {
      const message = err?.message || 'Failed to send password reset email.';
      setAuthError(message);
      throw err;
    }
  };

  const confirmPasswordReset = async (request: ConfirmPasswordResetRequest): Promise<void> => {
    setAuthError(null);
    try {
      await authService.confirmPasswordReset(request);
    } catch (err: any) {
      const message = err?.message || 'Failed to reset password.';
      setAuthError(message);
      throw err;
    }
  };

  const updateUserProfile = async (updates: Partial<AuthUser>): Promise<AuthUser> => {
    if (!user) throw new Error('No user is currently authenticated.');
    try {
      const updated = await authService.updateProfile(user.id, updates);
      setUser(updated);
      return updated;
    } catch (err: any) {
      const message = err?.message || 'Failed to update user profile.';
      setAuthError(message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: authService.isConfigured,
        providerName: authService.name,
        configStatus: authConfigStatus,
        login,
        signup,
        logout,
        sendPasswordReset,
        confirmPasswordReset,
        updateUserProfile,
        authError,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
