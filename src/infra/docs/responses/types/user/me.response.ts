import crypto from 'node:crypto';

import { ApiProperty } from '@nestjs/swagger';

export class MeResponse {
	@ApiProperty({
		type: 'string',
		readOnly: true,
		example: crypto.randomUUID(),
	})
	id: string;

	@ApiProperty({
		type: 'string',
		example: 'Adam SMith',
	})
	name: string;

	@ApiProperty({
		type: 'string',
		example: 'adam.smith@gmail.com',
	})
	email: string;

	@ApiProperty({
		type: 'string',
		isArray: true,
		example: ['web', 'http2', 'node', 'framework'],
	})
	tags?: string[];

	@ApiProperty({
		type: 'string',
		readOnly: true,
		example: new Date(),
	})
	createdAt: Date;
}
