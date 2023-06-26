import { Module } from '@nestjs/common';

import { ToolController } from './presenters/controllers/tool.controller';
import { UserController } from './presenters/controllers/user.controller';

// tool use-cases
import { CreateToolUseCase } from '@app/use-cases/tool/create-tool';
import { DeleteToolUseCase } from '@app/use-cases/tool/delete-tool';
import { ListToolsUseCase } from '@app/use-cases/tool/list-tools';
// user use-cases
import { CreateUserUseCase } from '@app/use-cases/user/create-user';

import { HashString } from '@data/contracts/hash';
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
	FindUserByEmailRepository as FindUserByEmailRepository,
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
	FindUserByEmailRepository;

@Module({
	imports: [DatabaseModule, HashModule],
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
			provide: CreateUserUseCase,
			useFactory: (
				hasher: HashString,
				userRepository: CreateUserRepository,
			): CreateUserUseCase => new CreateUserUseCase(hasher, userRepository),
			inject: [HashString, CreateUserRepositoryContract],
		},
	],
	controllers: [ToolController, UserController],
})
export class HTTPmodule {}
