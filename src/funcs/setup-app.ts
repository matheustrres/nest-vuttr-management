import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { envConfig } from '@config/env.config';
import { sessionConfig } from '@config/session.config';

import { GlobalExceptionFilter } from '@infra/http/exceptions/global-exception-filter';

export const setupApp = (app: INestApplication): INestApplication => {
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	app.useGlobalFilters(new GlobalExceptionFilter());

	app.use(sessionConfig);

	app.enableCors({
		origin: '*',
		methods: ['GET', 'POST', 'DELETE'],
		allowedHeaders: [
			'Acess',
			'Content-Type',
			'Authorization',
			'Accept',
			'Origin',
			'X-Requested-With',
		],
	});

	app.use(passport.session());
	app.use(passport.initialize());

	app.use(cookieParser(envConfig.session.secret));

	/* ... */

	return app;
};
