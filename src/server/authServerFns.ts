// all authentication functions

// src/utils/authServerFns.ts
import { createServerFn } from '@tanstack/react-start';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { SessionUser } from '~/types/auth';
import { useAppSession } from '~/utils/session';
import { z } from 'zod';

export const getCurrentUserFromSessionFnc = createServerFn({
  method: 'GET',
}).handler(async () => {
  const session = await useAppSession();

  if (!session) return null as SessionUser | null;

  if (session.data.userId !== undefined) {
    const userId = session.data.userId;

    const user = await getUserByIdFnc({ data: { userId } });
    return user;
  }
});

export const getUserByIdFnc = createServerFn({ method: 'GET' })
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    const foundUser = await prisma.user.findUnique({
      where: { id: data.userId },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        id: true,
      },
    });
    return foundUser;
  });

export const getUserByEmailFnc = createServerFn({ method: 'GET' })
  .inputValidator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const foundUser = await prisma.user.findUnique({
      where: { email: data.email },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        id: true,
        password: true,
      },
    });
    return foundUser;
  });

// ---------------------------------------------
// ⭐️ 2. LOGIN ACTION (Form Submission)
// ---------------------------------------------
// Login server function
// TODO: check
export const loginFnc = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ email: z.email(), password: z.string() }))
  .handler(async ({ data }) => {
    // Verify credentials (replace with your auth logic)
    const user = await authenticateUser(data.email, data.password);

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    // Create session
    const session = await useAppSession();
    await session.update({
      userId: user.id,
    });

    return { success: true };
    // Redirect to protected area
    // throw redirect({ to: '/dashboard' });
  });

async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmailFnc({ data: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}

// ---------------------------------------------
// ⭐️ 3. LOGOUT ACTION
// ---------------------------------------------
// Logout server function
export const logoutFnc = createServerFn({ method: 'POST' }).handler(
  async () => {
    const session = await useAppSession();
    await session.clear();

    // throw redirect({ to: '/' });
  }
);
