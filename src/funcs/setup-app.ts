import { INestApplication, ValidationPipe } from '@nestjs/common';

import { GlobalExceptionFilter } from '@infra/http/exceptions/global-exception-filter';

export const setupApp = (app: INestApplication): INestApplication => {
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

	app.useGlobalFilters(new GlobalExceptionFilter());

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

	/* ... */

	return app;
};
