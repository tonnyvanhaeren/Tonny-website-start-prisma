// src/utils/session.ts
import { useSession } from '@tanstack/react-start/server';

type SessionUser = {
  userId: string;
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
