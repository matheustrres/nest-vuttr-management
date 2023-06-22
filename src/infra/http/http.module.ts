import { Module } from '@nestjs/common';

import { ToolController } from './presenters/controllers/tool.controller';

import { CreateToolUseCase } from '@app/use-cases/create-tool';
import { DeleteToolUseCase } from '@app/use-cases/delete-tool';
import { ListToolsUseCase } from '@app/use-cases/list-tools';

import {
	CreateToolRepository as CreateToolRepositoryContract,
	DeleteToolRepository as DeleteToolRepositoryContract,
	FindToolByIdRepository as FindToolByIdRepositoryContract,
	FindToolByLinkRepository as FindToolByLinkRepositoryContract,
	FindToolByTitleRepository as FindToolByTitleRepositoryContract,
	ListToolsRepository as ListToolsRepositoryContract,
} from '@data/repositories/tool';

import { DatabaseModule } from '@infra/database/database.module';

type CreateToolRepository = CreateToolRepositoryContract &
	FindToolByLinkRepositoryContract &
	FindToolByTitleRepositoryContract;
type DeleteToolRepository = DeleteToolRepositoryContract &
	FindToolByIdRepositoryContract;

@Module({
	imports: [DatabaseModule],
	providers: [
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
	],
	controllers: [ToolController],
})
export class HTTPmodule {}
