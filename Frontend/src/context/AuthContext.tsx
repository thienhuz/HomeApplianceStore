import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AuthUser, LoginRequest, RegisterRequest } from '../types';
import * as authService from '../services/authService';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<number>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => authService.getStoredUser());

  const login = async (payload: LoginRequest) => {
    const auth = await authService.login(payload);
    setUser(auth.user);
  };

  const register = async (payload: RegisterRequest) => {
    return authService.register(payload);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
