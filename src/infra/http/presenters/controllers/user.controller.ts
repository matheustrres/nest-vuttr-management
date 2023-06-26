import { Body, Controller, Post } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

import { CreateUserUseCase } from '@app/use-cases/user/create-user';

import { CreateUserResponse } from '@infra/docs/responses/types/user';
import { CreateUserDto } from '@infra/http/dtos/user';

@ApiTags('users')
@Controller('users')
export class UserController {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	@ApiOperation({
		description: 'Creates a new User.',
	})
	@ApiBody({
		description: 'Properties to create a User.',
		type: CreateUserDto,
		required: true,
	})
	@ApiBadRequestResponse({
		description: 'A User has already been registered with given email.',
	})
	@ApiCreatedResponse({
		description: 'A User has been successfully created.',
		type: CreateUserResponse,
	})
	@Post()
	public async createToolRoute(@Body() body: CreateUserDto) {
		return this.createUserUseCase.exec(body);
	}
}
