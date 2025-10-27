// contexts/auth.tsx
import { createContext, useContext, ReactNode } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { getCurrentUserFn } from '../server/functions/user-server-fn';

type User = {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

type AuthContextType = {
  user: (() => Promise<User | null>) | null;
  isLoading: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const getCurrentUser = useServerFn(getCurrentUserFn);

  const refetch = () => {
    void getCurrentUser();
  };

  return (
    <AuthContext.Provider
      value={{ user: getCurrentUser, isLoading: false, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
