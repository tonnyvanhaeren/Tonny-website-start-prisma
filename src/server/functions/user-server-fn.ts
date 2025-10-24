import prisma from '../../lib/prisma';
import { createServerFn } from '@tanstack/react-start';

export const getUsers = createServerFn({ method: 'GET' }).handler(async () => {
  return prisma.user.findMany({});
});
