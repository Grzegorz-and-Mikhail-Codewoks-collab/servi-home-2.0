import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmailOrderAccepted } from '../../lib/sendEmail';
import { MailOptions } from '../../types';

const email: string | undefined = process.env.EMAIL;

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { bookingId } = req.body;

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'ACCEPTED',
      },
      include: {
        address: true,
        services: true,
        user: true,
      },
    });

    const userIdFromBooking = await prisma.booking.findFirst({
      where: { id: bookingId },
      select: {
        userId: true,
      },
    });

    if (userIdFromBooking) {
      const userEmailFromBooking = await prisma.user.findFirst({
        where: { id: userIdFromBooking.userId as string },
        select: {
          email: true,
        },
      });
      if (userEmailFromBooking) {
        const mailOptions: MailOptions = {
          from: `Servi Home <${email}>`,
          to: userEmailFromBooking.email,
          subject: 'Confirmation: Your Order Has Been Accepted',
          text: "Dear valued customer,\n\nWe're pleased to inform you that your order has been accepted. Our cleaner will be in touch with you shortly to finalize details and ensure a smooth service experience. Thank you for choosing Your Company Name.\n\nWarm regards,\nThe Your Company Name Team",
          html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 5px;">
              <h2 style="color: #333;">Confirmation: Your Order Has Been Accepted</h2>
              <p>Dear valued customer,</p>
              <p>We're pleased to inform you that your order has been accepted. Our cleaner will be in touch with you shortly to finalize details and ensure a smooth service experience. Thank you for choosing <b>Servi Home</b>.</p>
              <p>Warm regards,</p>
              <p><b>The Servi Home Team</b></p>
          </div>`,
        };

        await sendEmailOrderAccepted(mailOptions);
      }
    }

    return res.status(200).json(updatedBooking);
  } catch (error: any) {
    console.error('Error updating booking:', error);
    return res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  } finally {
    await prisma.$disconnect();
  }
};
