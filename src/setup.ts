import { INestApplication, ValidationPipe } from '@nestjs/common';

export const setupApp = (app: INestApplication): INestApplication => {
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);

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
