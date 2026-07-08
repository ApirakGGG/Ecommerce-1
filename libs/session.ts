import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId?: string;
  isLoggedIn?: boolean;
}

export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD || 'your-default-password',
  cookieName: 'my-cookie',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}
