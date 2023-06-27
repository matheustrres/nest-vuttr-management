import pgConnec from 'connect-pg-simple';
import session from 'express-session';

const stage = process.env.NODE_ENV as string;

export const sessionConfig = session({
	secret: process.env.SESSION_SECRET_KEY as string,
	resave: false,
	saveUninitialized: false,
	store:
		stage === 'production'
			? new (pgConnec(session))()
			: new session.MemoryStore({
					captureRejections: true,
			  }),
	cookie: {
		httpOnly: true,
		signed: true,
		sameSite: 'strict',
		secure: stage === 'production',
	},
});
