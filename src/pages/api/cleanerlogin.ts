import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!secretKey) {
    return res.status(500).json({ error: 'JWT_SECRET not defined' });
  }
  if (req.method === 'POST') {
    const { email, password } = req.body;

    type Cleaner = {
      id: string;
      username: string;
      email: string;
      password: string;
    };

    type CleanerWithoutPassword = Omit<Cleaner, 'password'>;

    type SuccessResponse = {
      message: string;
      cleaner: CleanerWithoutPassword;
      token: string;
    };

    type ErrorResponse = {
      error: string;
    };

    try {
      const cleaner: Cleaner | null = await db.cleaner.findUnique({
        where: { email },
        select: { id: true, email: true, username: true, password: true },
      });

      if (!cleaner || !(await compare(password, cleaner.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token: string = sign(
        // { userId: cleaner.id, role: cleaner.role },
        { userId: cleaner.id },
        secretKey,
        { expiresIn: '1h' }
      );

      const { password: _, ...cleanerWithoutPassword }: Cleaner = cleaner;

      res.status(200).json({
        message: 'User authenticated successfully',
        cleaner: cleanerWithoutPassword,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
