import prisma from '../../lib/prisma';
import { createServerFn } from '@tanstack/react-start';
import { loginSchema, registerSchema } from '~/lib/validation-schemas';
import { useAppSession } from '~/utils/session';
import { User } from '~/types/auth';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const getUsers = createServerFn({ method: 'GET' }).handler(async () => {
  return prisma.user.findMany({});
});

export const fetchSessionData = createServerFn({ method: 'GET' }).handler(
  async () => {
    // We need to auth on the server so we have access to secure cookies
    const session = await useAppSession();

    if (!session.data.userId) {
      return null;
    }

    return {
      userId: session.data.userId,
    };
  }
);

export const getUserByEmail = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ email: z.email() }))
  .handler(async ({ data }) => {
    const foundUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    return foundUser;
  });

export const getUserById = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ id: z.cuid() }))
  .handler(async ({ data }) => {
    const foundUser = await prisma.user.findUnique({
      where: { id: data.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        phoneNumber: true,
      },
    });

    if (!foundUser) {
      return null;
    }

    const returnUser: User | null = {
      id: foundUser?.id,
      firstName: foundUser?.firstName,
      lastName: foundUser?.lastName,
      email: foundUser?.email,
      phoneNumber: foundUser?.phoneNumber || '',
      role: foundUser?.role,
    };
    return returnUser;
  });

// Registration server function

export const registerUser = createServerFn({ method: 'POST' })
  .inputValidator(registerSchema)
  .handler(
    async ({ data: { email, firstname, lastname, phoneNumber, password } }) => {
      const hashedPassword = await bcrypt.hash(password, 12);

      const existingUser = await getUserByEmail({ data: { email } });

      // check if a user with the same email already exists
      if (existingUser) {
        throw new Error(
          'Een gebruiker met dit e-mailadres en wachtwoord bestaat al.'
        );
      }

      const newUser = await prisma.user.create({
        data: {
          firstName: firstname,
          lastName: lastname,
          email: email,
          phoneNumber: phoneNumber || '',
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          role: true,
        },
      });

      // type SessionUser = {
      //   userId: string;
      //   email: string;
      //   phoneNumber: string;
      //   firstName: string;
      //   lastName: string;
      //   role: string;
      // };

      // Create session
      const session = await useAppSession();
      await session.update({
        userId: newUser.id,
      });

      return newUser;
    }
  );

// Login server function
export const login = createServerFn({ method: 'POST' })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    // Verify credentials (replace with your auth logic)
    const user = await authenticateUser(data.email, data.password);

    // if (!user) {
    //   return { error: 'Invalid credentials' };
    // }

    if (!user) {
      throw new Error('Email or wachtwoord onjuist!');
    }

    // Create session
    const session = await useAppSession();
    await session.update({
      userId: user.id,
    });

    return { success: true };
    // Redirect to protected area
    //throw redirect({ to: '/dashboard' });
  });

// Logout server function
export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession();
  await session.clear();
});

// Get current user
/** get the session data if any and find the user if any */
//** Returns null or User  no password or timestamps */
export const getCurrentUserSFN = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession();
    const userId = session.data.userId;

    if (!userId) {
      return null;
    }

    const returnUser: User | null = await getUserById({ data: { id: userId } });

    return returnUser;
  }
);

async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmail({ data: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}
