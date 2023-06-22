import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateToolDto {
	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	link: string;

	@IsString()
	@IsNotEmpty()
	title: string;

	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty()
	tags: string[];
}
