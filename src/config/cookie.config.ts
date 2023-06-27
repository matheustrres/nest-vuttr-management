import { CookieOptions } from 'express';

export const cookieConfig: CookieOptions = {
	httpOnly: true,
	signed: true,
	sameSite: 'strict',
	secure: (process.env.NODE_ENV as string) === 'production',
};
