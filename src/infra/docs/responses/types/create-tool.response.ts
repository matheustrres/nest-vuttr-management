import crypto from 'node:crypto';

import { ApiProperty } from '@nestjs/swagger';

export class CreateToolResponse {
	@ApiProperty({
		type: 'string',
		readOnly: true,
		example: crypto.randomUUID(),
	})
	id: string;

	@ApiProperty({
		type: 'string',
		example: 'Notion',
	})
	title: string;

	@ApiProperty({
		type: 'string',
		example:
			'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
	})
	description: string;

	@ApiProperty({
		type: 'string',
		example: 'https://notion.so',
	})
	link: string;

	@ApiProperty({
		type: 'string[]',
		isArray: true,
		example: [
			'organization',
			'planning',
			'collaboration',
			'writing',
			'calendar',
		],
	})
	tags: string[];

	@ApiProperty({
		type: 'string',
		readOnly: true,
		example: new Date(),
	})
	createdAt: Date;
}
