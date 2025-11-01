// src/hooks/useAuth.ts

//TODO: Refactor this to use only logout and clear login

import { useNavigate, useRouteContext } from '@tanstack/react-router';
import { UserRole, User } from '../types/auth';
import { loginFnc, logoutFnc } from '../server/authServerFns'; // Your server functions

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean; // True if the root loader is running

  // Role-Checking Utilities
  hasRole: (requiredRole: UserRole) => boolean;
  isAdmin: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// ⭐️ The main useAuth hook
export const useAuth = (): AuthState => {
  const navigate = useNavigate();

  // Access sessionUser from the root route's loader data
  const { user } = useRouteContext({ from: '__root__' }) as {
    user: User | null;
  };

  // console.log('hooks: useAuth - user', user);

  // The router provides a loading state for its loaders
  const { isFetching } = useRouteContext({ from: '__root__' }) as {
    isFetching: boolean;
  };

  const isAuthenticated = !!user;
  const userRole = user?.role;

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

  const login = async (email: string, password: string) => {
    const result = await loginFnc({ data: { email, password } });

    if (result.success) {
      // Force a re-run of the router's root loader to fetch the new session
      await navigate({ to: '/', replace: true, params: true, search: true });
    } else {
      throw new Error('Login failed on server.');
    }
  };

  const logout = async () => {
    await logoutFnc();
    // Force a re-run of the router's root loader to clear the session
    await navigate({ to: '/auth/login', replace: true });
  };

  return {
    isAuthenticated,
    user: user,
    isLoading: isFetching, // Use router's loading state

    hasRole,
    isAdmin: userRole === 'ADMIN',

    login,
    logout,
  };
};
