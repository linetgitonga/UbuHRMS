'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  username: string | null;
  role: string | null;
  isLoading: boolean;
  setToken: (token: string | null) => void;
  setUsername: (username: string | null) => void;
  setRole: (role: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUsername = localStorage.getItem('username');
    const savedRole = localStorage.getItem('role');

    if (savedToken) {
      setToken(savedToken);
      setUsername(savedUsername);
      setRole(savedRole);
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    setToken(null);
    setUsername(null);
    setRole(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('authToken', newToken);
    } else {
      localStorage.removeItem('authToken');
    }
  };

  const handleSetUsername = (newUsername: string | null) => {
    setUsername(newUsername);
    if (newUsername) {
      localStorage.setItem('username', newUsername);
    } else {
      localStorage.removeItem('username');
    }
  };

  const handleSetRole = (newRole: string | null) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem('role', newRole);
    } else {
      localStorage.removeItem('role');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        role,
        isLoading,
        setToken: handleSetToken,
        setUsername: handleSetUsername,
        setRole: handleSetRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
