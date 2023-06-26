import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateToolDto {
	@ApiProperty({
		type: 'string',
		example: 'Notion',
	})
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({
		type: 'string',
		example:
			'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
	})
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({
		type: 'string',
		example: 'https://notion.so',
	})
	@IsString()
	@IsNotEmpty()
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
	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty()
	tags: string[];
}
