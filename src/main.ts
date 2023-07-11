import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupApp, setupDocs } from './funcs';

import { envConfig } from '@config/env.config';

async function bootstrap(): Promise<void> {
	const app: INestApplication = await NestFactory.create(AppModule);

	setupApp(app);
	setupDocs(app);

	await app.listen(envConfig.appPort);
}

bootstrap();
