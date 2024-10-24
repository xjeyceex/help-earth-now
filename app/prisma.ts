import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.resolve(__dirname, './app/prisma/dev.db')}`,
    },
  },
});

export { prisma };
