export interface BookingData {
  user: {
    id: string;
    email: string;
    password: string;
    username: string;
    createdAt: Date;
  };

  address: {
    id: string;
    detail: string;
    latitude: number;
    longitude: number;
    userId: string;
  };
  services: {
    id: string;
    type: string;
    description: string;
    imageUrl: string | null;
    bookingId: string;
  }[];
  id?: string | null | undefined;
  status?: string;
}

export interface BookingDataSingle {
  id: string;
  userId: string;
  addressId: string;
  status: string;
  createdAt: Date;
}

export interface Reviews {
  id: string;
  title: string;
  name: string;
  content: string;
  createdAt: Date;
}

export interface Auth {
  user: string;
  pass: string;
}

export interface Transporter {
  service: string;
  port?: number;
  secure?: boolean;
  auth: Auth;
}
export interface MailOptions {
  from: string | undefined;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface User {
  id?: string;
  email: string;
  password?: string;
  username: string;
  createdAt?: Date;
}
