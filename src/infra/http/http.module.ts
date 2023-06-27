import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { SessionSerializer } from './auth/session.serializer';
import { JWTStrategy } from './auth/strategies/jwt.strategy';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { ToolController } from './presenters/controllers/tool.controller';
import { UserController } from './presenters/controllers/user.controller';

// tool use-cases
import { CreateToolUseCase } from '@app/use-cases/tool/create-tool';
import { DeleteToolUseCase } from '@app/use-cases/tool/delete-tool';
import { ListToolsUseCase } from '@app/use-cases/tool/list-tools';
// user use-cases
import { AuthUserUseCase } from '@app/use-cases/user/auth-user';
import { CreateUserUseCase } from '@app/use-cases/user/create-user';

import { HashString, CompareStrings } from '@data/contracts/hash';
// tool repositories
import {
	CreateToolRepository as CreateToolRepositoryContract,
	DeleteToolRepository as DeleteToolRepositoryContract,
	FindToolByIdRepository as FindToolByIdRepositoryContract,
	FindToolByLinkRepository as FindToolByLinkRepositoryContract,
	FindToolByTitleRepository as FindToolByTitleRepositoryContract,
	ListToolsRepository as ListToolsRepositoryContract,
} from '@data/contracts/repositories/tool';

// user repositories
import {
	CreateUserRepository as CreateUserRepositoryContract,
	FindUserByEmailRepository as FindUserByEmailRepositoryContract,
} from '@data/contracts/repositories/user';

import { DatabaseModule } from '@infra/database/database.module';
import { HashModule } from '@infra/providers/hash/hash.module';

// tool repositories contracts
type CreateToolRepository = CreateToolRepositoryContract &
	FindToolByLinkRepositoryContract &
	FindToolByTitleRepositoryContract;
type DeleteToolRepository = DeleteToolRepositoryContract &
	FindToolByIdRepositoryContract;

// user repositories contracts
type CreateUserRepository = CreateUserRepositoryContract &
	FindUserByEmailRepositoryContract;
type FindUserRepository = FindUserByEmailRepositoryContract;

@Module({
	imports: [
		DatabaseModule,
		HashModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
			session: true,
		}),
	],
	providers: [
		// tool-related
		{
			provide: CreateToolUseCase,
			useFactory: (toolRepository: CreateToolRepository): CreateToolUseCase =>
				new CreateToolUseCase(toolRepository),
			inject: [
				CreateToolRepositoryContract,
				FindToolByLinkRepositoryContract,
				FindToolByTitleRepositoryContract,
			],
		},
		{
			provide: DeleteToolUseCase,
			useFactory: (toolRepository: DeleteToolRepository): DeleteToolUseCase =>
				new DeleteToolUseCase(toolRepository),
			inject: [DeleteToolRepositoryContract, FindToolByIdRepositoryContract],
		},
		{
			provide: ListToolsUseCase,
			useFactory: (
				toolRepository: ListToolsRepositoryContract,
			): ListToolsUseCase => new ListToolsUseCase(toolRepository),
			inject: [ListToolsRepositoryContract],
		},
		// user-related
		{
			provide: AuthUserUseCase,
			useFactory: (
				hasher: CompareStrings,
				userRepository: FindUserRepository,
			): AuthUserUseCase => new AuthUserUseCase(hasher, userRepository),
			inject: [CompareStrings, FindUserByEmailRepositoryContract],
		},
		{
			provide: CreateUserUseCase,
			useFactory: (
				hasher: HashString,
				userRepository: CreateUserRepository,
			): CreateUserUseCase => new CreateUserUseCase(hasher, userRepository),
			inject: [HashString, CreateUserRepositoryContract],
		},
		LocalStrategy,
		JWTStrategy,
		SessionSerializer,
	],
	controllers: [ToolController, UserController],
})
export class HTTPModule {}
