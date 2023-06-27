import pgConnec from 'connect-pg-simple';
import session from 'express-session';

import { cookieConfig } from './cookie.config';

export const sessionConfig = session({
	secret: process.env.SESSION_SECRET_KEY as string,
	resave: false,
	saveUninitialized: false,
	store:
		(process.env.NODE_ENV as string) === 'production'
			? new (pgConnec(session))()
			: new session.MemoryStore({
					captureRejections: true,
			  }),
	cookie: cookieConfig,
});
