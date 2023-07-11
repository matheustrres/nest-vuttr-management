import { CookieOptions } from 'express';

import { envConfig } from './env.config';

export const cookieConfig: CookieOptions = {
	httpOnly: true,
	signed: true,
	sameSite: 'strict',
	secure: envConfig.mode === 'production',
};
