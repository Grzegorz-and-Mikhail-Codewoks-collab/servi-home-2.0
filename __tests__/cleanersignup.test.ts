import { db } from '../src/lib/db';
import { hash } from 'bcrypt';

jest.mock('../src/lib/db', () => ({
  db: {
    cleaner: {
      create: jest.fn(),
    },
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Database Interaction', () => {
  it('should create a cleaner successfully', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
    };

    (hash as jest.Mock).mockResolvedValue('hashedPassword');

    (db.cleaner.create as jest.Mock).mockResolvedValue({
      id: '123',
      email: userData.email,
      username: userData.username,
    });

    const createdCleaner = await db.cleaner.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: 'hashedPassword',
      },
      select: { id: true, email: true, username: true },
    });

    expect(createdCleaner).toEqual({
      id: '123',
      email: userData.email,
      username: userData.username,
    });
  });

  it('should handle error during cleaner creation', async () => {
    const invalidData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
    };

    (hash as jest.Mock).mockRejectedValue(new Error('Hashing error'));

    try {
      await db.cleaner.create({
        data: {
          username: invalidData.username,
          email: invalidData.email,
          password: 'testpassword1', 
        },
        select: { id: true, email: true, username: true },
      });
    } catch (error) {
      expect(error).toBe('Hashing error');
    }
  });
});

