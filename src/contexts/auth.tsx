// contexts/auth.tsx
import { createContext, useContext, ReactNode } from 'react';
import { getCurrentUserSfn } from '../server/functions/user-server-fn';
import { UserRole, SessionUser, User } from '~/types/auth';
import { useServerFn } from '@tanstack/react-start';

// type UserRole = 'ADMIN' | 'USER';

// type User = {
//   id: string;
//   email: string;
//   role: string;
// };

// export type SessionUser = {
//   id: String;
//   email: string;
//   userId: string;
//   lastName: string;
//   firstName: string;
//   role: UserRole; // Enforce the defined roles
//   phoneNumber?: string;
// };

type AuthContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  isLoading: boolean;

  // Role-Checking Utilities
  hasRole: (requiredRole: UserRole) => boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useServerFn(getCurrentUserSfn);

  let isAuthenticated = false;
  let isAdmin = false;
  let userRole = '';

  const hasRole = (requiredRole: UserRole): boolean => {
    if (!userRole) return false;

    // Simple hierarchy: ADMIN has all rights
    if (
      requiredRole === 'USER' &&
      (userRole === 'USER' || userRole === 'ADMIN')
    )
      return true;
    if (requiredRole === 'ADMIN' && userRole === 'ADMIN') return true;

    return false;
  };

  // if (user !== null) {
  //   isAuthenticated = true;
  //   userRole = user.role;
  //   if (user.role === 'ADMIN') {
  //     isAdmin = true;
  //   }
  // }

  const refetch = () => {};
  const isLoading = false;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        refetch,
        isAuthenticated,
        isAdmin: userRole === 'ADMIN',
        hasRole,
      }}
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

// contexts/auth.tsx
// import { createContext, useContext, ReactNode } from 'react';
// import { SessionUser, UserRole } from '~/types/auth';
// import { useServerFn } from '@tanstack/react-start';
// import { getCurrentUserFn } from '../server/functions/user-server-fn';

// type User = {
//   id: string;
//   email: string;
//   phoneNumber: string | null;
//   firstName: string;
//   lastName: string;
//   role: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

// type AuthContextType = {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   isAdmin: boolean;

//   // Role-checking utilities
//   hasRole: (requiredRole: UserRole) => boolean;

//   // actions
//   refetch: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const getCurrentUser = useServerFn(getCurrentUserFn);

//   const refetch = () => {
//     void getCurrentUser();
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user: getCurrentUser, isLoading: false, refetch }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// }
