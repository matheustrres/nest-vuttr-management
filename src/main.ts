import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupApp } from './setup';

async function bootstrap(): Promise<void> {
	const app: INestApplication = await NestFactory.create(AppModule);

	setupApp(app);

	await app.listen(3000);
}

bootstrap();
