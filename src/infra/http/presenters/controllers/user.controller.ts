import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

import { UserVMResponse, UserViewModel } from '../view-models/user.view-model';

import { CreateUserUseCase } from '@app/use-cases/user/create-user';

import { User } from '@domain/entities/user.entity';

import { CreateUserResponse } from '@infra/docs/responses/types/user';
import { AuthedUser } from '@infra/http/auth/decorators/authed-user.decorator';
import { JWTAuthGuard } from '@infra/http/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@infra/http/auth/guards/local-auth.guard';
import { SessionAuthGuard } from '@infra/http/auth/guards/session-auth.guard';
import { JWTTokenInterceptor } from '@infra/http/auth/interceptors/jwt-token.interceptor';
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
	@HttpCode(HttpStatus.CREATED)
	@UseInterceptors(JWTTokenInterceptor)
	public async createUserRoute(
		@Body() body: CreateUserDto,
	): Promise<UserVMResponse> {
		const { user } = await this.createUserUseCase.exec(body);

		return UserViewModel.toHTTP(user);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	@UseInterceptors(JWTTokenInterceptor)
	public loginUserRoute(@AuthedUser() user: User): UserVMResponse {
		return UserViewModel.toHTTP(user);
	}

	@Get('me')
	@HttpCode(HttpStatus.OK)
	@UseGuards(SessionAuthGuard, JWTAuthGuard)
	public meRoute(@AuthedUser() user: User): UserVMResponse {
		return UserViewModel.toHTTP(user, true);
	}
}
