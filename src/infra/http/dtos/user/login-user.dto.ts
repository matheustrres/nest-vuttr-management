import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
	@ApiProperty({
		type: 'string',
		example: 'adamsmith@gmail.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		type: 'string',
		example: 'fb$nSTP51F&3',
	})
	@IsString()
	@IsNotEmpty()
	password: string;
}
