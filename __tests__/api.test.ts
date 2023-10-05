
import { PrismaClient } from "@prisma/client";

type user = {
    id: string;
    email: string;
    password: string;
    username: string;
    createdAt: Date;
} | null;

describe('Logedin Integration Tests', () => {
  const DATABASE_URL="postgresql://prisma:prisma@127.0.0.1:5433/tests"

  
  const prisma = new PrismaClient({
      datasources: {
        db: {
      url: DATABASE_URL,
        }
      }
    });

  /* afterAll(async () => {
    await prisma.$disconnect();
  }); */

  it('should create a new user in the database', async () => {

    const testData : {username:string, email:string, password:string,} =  {
      username: 'testUser',
      email: '1@2.3',
      password: 'hashedPassword'
    }
    
    const createdUser = await prisma.user.create({
      data: testData,
    });
  
    expect(createdUser.username).toBe(testData.username);
    expect(createdUser.email).toBe(testData.email);
  });

  it('should create a new address in the database', async () => {
    const user:user = await prisma.user.findFirst()
    
    if (user) { 
      const userId = user.id;

      const adr = await prisma.address.create({
        data: {
          detail: 'address456',
          userId: userId,
          },
      });

      const testData = {
        detail: 'address456',
        userId: userId,
        }
      expect(adr.userId).toBe(testData.userId);
      expect(adr.detail).toBe(testData.detail);
      }
  });

  it('should create a new booking in the database', async () => {
    
    const user:user = await prisma.user.findFirst()
    const adr = await prisma.address.findFirst()

    
    if (user&&adr) { 
      const userId = user.id;

      const testData = {
        userId: userId,
        addressId: adr.id,
        status: 'PENDING',
      };
    
    const createdBooking = await prisma.booking.create({
      data: {
        userId: userId,
        addressId: adr.id,
        status: 'PENDING',
        }
    })

      expect(createdBooking.userId).toBe(testData.userId);
      expect(createdBooking.addressId).toBe(testData.addressId);
      expect(createdBooking.status).toBe(testData.status);
  }
  });

  it('should create a new service in the database', async () => {
    const booking = await prisma.booking.findFirst();

    if (booking) {
    
      const testData = {
        bookingId: booking.id,
        type: 'Revitalize Your Rugs',
        description: JSON.stringify([
          { attribute: 'rugmeasure', value: '5x7' },
          { attribute: 'rugcondition', value: 'Good' },
        ]),
      };

      const createdService = await prisma.service.create({
        data: {
          bookingId: booking.id,
          type: 'Revitalize Your Rugs',
          description: JSON.stringify([
           { attribute: 'rugmeasure', value: '5x7' },
           { attribute: 'rugcondition', value: 'Good' },
         ]),
       },
      });

      expect(createdService.bookingId).toBe(testData.bookingId);
      expect(createdService.type).toBe(testData.type);
      expect(createdService.description).toBe(testData.description);
    }
  });

  

});
