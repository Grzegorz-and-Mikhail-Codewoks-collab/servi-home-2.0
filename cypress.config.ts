import { defineConfig } from 'cypress';
import { db } from './src/lib/db';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User, BookingDataSingle } from './src/types';

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        clearUser: async (user) => {
          // Delete the user based on stored information

          await db.user.delete({
            where: {
              email: user.email,
            },
          });

          return null;
        },
        seedDatabase: async (user) => {
          const hashedPassword: string = await hash(user.password, 10);

          const createdUser: User = await db.user.create({
            data: {
              username: user.username,
              email: user.email,
              password: hashedPassword,
            },
            select: { id: true, email: true, username: true },
          });
          return createdUser;
        },

        clearBooking: async () => {
          //extract address id

          const bookingData: BookingDataSingle | null =
            await db.booking.findFirst({
              select: {
                id: true,
                userId: true,
                addressId: true,
                status: true,
                createdAt: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            });
          console.log(bookingData);

          if (bookingData) {
            await db.service.deleteMany({
              where: {
                bookingId: bookingData.id,
              },
            });

            await db.booking.delete({
              where: {
                id: bookingData.id,
              },
            });

            await db.address.delete({
              where: {
                id: bookingData.addressId,
              },
            });
          } else {
            console.log('No booking data found.');
          }

          return null;
        },
      });
    },
  },
});
