export const PrismaClient = jest.fn(() => ({
  cleaner: {
    findUnique: jest.fn(),
    create: jest.fn(),
    // other Prisma methods you're using
  },
  // other Prisma client methods you're using
}));
