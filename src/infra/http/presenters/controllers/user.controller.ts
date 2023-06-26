import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserUseCase } from '@app/use-cases/user/create-user';

import { CreateUserDto } from '@infra/http/dtos/user';

@Controller('users')
export class UserController {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	@Post()
	public async createToolRoute(@Body() body: CreateUserDto) {
		return this.createUserUseCase.exec(body);
	}
}
