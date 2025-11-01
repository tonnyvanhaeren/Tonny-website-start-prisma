// src/types/auth.ts

export type UserRole = 'ADMIN' | 'USER';

export type SessionUser = {
  email: string;
  id: string;
  lastName: string;
  firstName: string;
  role: string; // Enforce the defined roles
  phoneNumber?: string;
};

export type User = {
  email: string;
  phoneNumber?: string;
  id: string;
  lastName: string;
  firstName: string;
  role: string; // Enforce the defined roles
};

// Simplified Mock "Database" for demonstration
export const MOCK_DB: Record<string, SessionUser> = {
  'user-123': {
    email: 'user@app.com',
    id: 'user-123',
    lastName: 'Doe',
    firstName: 'John',
    role: 'USER',
    phoneNumber: '123-456-7890',
  },
  'admin-456': {
    email: 'admin@app.com',
    id: 'admin-456',
    lastName: 'Smith',
    firstName: 'Alice',
    role: 'ADMIN',
    phoneNumber: '987-654-3210',
  },
};
