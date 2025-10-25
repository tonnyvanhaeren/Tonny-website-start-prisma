import prisma from '../../lib/prisma';
import { createServerFn } from '@tanstack/react-start';
import { registerSchema } from '~/lib/validation-schemas';
import bcrypt from 'bcryptjs';

export const getUsers = createServerFn({ method: 'GET' }).handler(async () => {
  return prisma.user.findMany({});
});

export const registerUser = createServerFn({ method: 'POST' })
  .inputValidator(registerSchema)
  .handler(async ({ data }) => {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Een gebruiker met dit e-mailadres bestaat al.');
    }

    const newUser = await prisma.user.create({
      data: {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: hashedPassword,
      },
    });
    return newUser;
  });
