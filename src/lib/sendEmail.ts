import dotenv from 'dotenv';
import nodemailer, { SentMessageInfo } from 'nodemailer';
import { MailOptions } from '../types';
import { Transporter } from 'nodemailer';

dotenv.config();

const email: string | undefined = process.env.EMAIL;
const pass: string | undefined = process.env.EMAIL_PASS;

const transporter: Transporter<SentMessageInfo> = nodemailer.createTransport({
  service: 'gmail',
  // port: 587,
  // secure: false,
  auth: {
    user: email,
    pass,
  },
});

export const sendEmailOrderAccepted = async (
  mailOptions: MailOptions
): Promise<void> => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// try {
//   await transporter.sendMail({
//     from: `Servi Home <${email}>`,
//     to: email,
//     subject: 'Confirmation: Your Order Has Been Accepted',
//     text: "Dear valued customer,\n\nWe're pleased to inform you that your order has been accepted. Our cleaner will be in touch with you shortly to finalize details and ensure a smooth service experience. Thank you for choosing Your Company Name.\n\nWarm regards,\nThe Your Company Name Team",
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 5px;">
//           <h2 style="color: #333;">Confirmation: Your Order Has Been Accepted</h2>
//           <p>Dear valued customer,</p>
//           <p>We're pleased to inform you that your order has been accepted. Our cleaner will be in touch with you shortly to finalize details and ensure a smooth service experience. Thank you for choosing <b>Servi Home</b>.</p>
//           <p>Warm regards,</p>
//           <p><b>The Servi Home Team</b></p>
//       </div>`,
//   });

export const sendEmailConfirmation = async (
  mailOptions: MailOptions
): Promise<void> => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
