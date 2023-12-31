import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({
		type: 'string',
		example: 'John Doe',
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		type: 'string',
		example: 'johndoe@gmail.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		type: 'string',
		example: 'Dsa5uGFl96N#',
	})
	@IsString()
	@IsNotEmpty()
	password: string;
}
