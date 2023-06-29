import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export const setupDocs = (app: INestApplication): void => {
	const config = new DocumentBuilder()
		.setTitle('VUTTR Manager Documentation')
		.setDescription('How to use VUTTR Manager routes')
		.setVersion('1.0.0')
		.addBearerAuth({
			description: 'A JSONWebToken retrieved from authentication',
			type: 'http',
			bearerFormat: 'token',
		})
		.addTag('tools')
		.addTag('users')
		.build();

	const openAPIObj: OpenAPIObject = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api', app, openAPIObj);
};
