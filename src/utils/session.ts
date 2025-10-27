// src/utils/session.ts
import { useSession } from '@tanstack/react-start/server';

type SessionUser = {
  userId: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: string;
};

export function useAppSession() {
  return useSession<SessionUser>({
    name: 'tonny-website-start-prisma-session',
    password: process.env.SESSION_SECRET!, // At least 32 characters -- import.meta.env.VITE_SESSION_SECRET!
    //password: 'ChangeThisBeforeShippingToProdOrYouWillBeFired',

    // inserted by MyCoder.ai
    cookie: {
      // Set secure in production environments
      secure: process.env.NODE_ENV === 'production',
      // Use Lax for better compatibility while maintaining security
      sameSite: 'lax',
      // Prevent JavaScript access to the cookie
      httpOnly: true,
      // Set explicit expiration (30 days)
      maxAge: 30 * 24 * 60 * 60,
      // Ensure cookie is set for the root path
      path: '/',
    },
  });
}
// import { useSession } from '@tanstack/react-start/server';
// import type { User } from 'src/generated/prisma/client.js';

// type SessionUser = {
//   userEmail: User['email'];
// };

// export function useAppSession() {
//   return useSession<SessionUser>({
//     password: 'ChangeThisBeforeShippingToProdOrYouWillBeFired',
//   });
// }

// export function useAppSession() {
//   return useSession<SessionData>({
//     // Session configuration
//     name: 'app-session',
//     password: process.env.SESSION_SECRET!, // At least 32 characters
//     // Optional: customize cookie settings
//     cookie: {
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       httpOnly: true,
//     },
//   });
// }
