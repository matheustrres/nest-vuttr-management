import pgConnec from 'connect-pg-simple';
import session from 'express-session';

import { cookieConfig } from './cookie.config';
import { envConfig } from './env.config';

export const sessionConfig = session({
	secret: envConfig.session.secret,
	resave: false,
	saveUninitialized: false,
	store:
		envConfig.mode === 'production'
			? new (pgConnec(session))()
			: new session.MemoryStore({
					captureRejections: true,
			  }),
	cookie: cookieConfig,
});
