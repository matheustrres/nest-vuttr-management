type DbEnvConfig = {
	host: string;
	name: string;
	password: string;
	username: string;
};

type EnvConfig = {
	mode: string;
	appPort: number;
	db: DbEnvConfig;
	jwt: {
		expiresIn: string;
		secret: string;
	};
	session: {
		secret: string;
	};
};

export const envConfig: EnvConfig = {
	appPort: Number(process.env.APP_PORT) || 3000,
	mode: process.env.NODE_ENV as string,
	db: {
		name: process.env.PG_DATABASE as string,
		host: process.env.PG_HOST as string,
		password: process.env.PG_PASSWORD as string,
		username: process.env.PG_USERNAME as string,
	},
	jwt: {
		secret: process.env.JWT_SECRET_KEY as string,
		expiresIn: (process.env.JWT_EXPIRES_IN as string) || '12h',
	},
	session: {
		secret: process.env.SESSION_SECRET_KEY as string,
	},
};
