import crypto from 'node:crypto';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserResponse {
	@ApiProperty({
		type: 'string',
		readOnly: true,
		example: crypto.randomUUID(),
	})
	id: string;

	@ApiProperty({
		type: 'string',
		example: 'John Doe',
	})
	name: string;

	@ApiProperty({
		type: 'string',
		example: 'johndoe@gmail.com',
	})
	email: string;

	@ApiProperty({
		type: 'string',
		example: '$2y$09$Hk3pviJsaSuvtnWy6m14q.TAVx6Mf3VSUszIMUTriXbWpWYqYX34W',
	})
	password: string;

	@ApiProperty({
		type: 'string',
		readOnly: true,
		example: new Date(),
	})
	createdAt: Date;
}
