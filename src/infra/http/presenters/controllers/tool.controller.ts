import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiHeader,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';

import { ToolVMResponse, ToolViewModel } from '../view-models/tool.view-model';

import { CreateToolUseCase } from '@app/use-cases/tool/create-tool';
import { DeleteToolUseCase } from '@app/use-cases/tool/delete-tool';
import { FindToolByIdUseCase } from '@app/use-cases/tool/find-tool-by-id';
import { ListToolsUseCase } from '@app/use-cases/tool/list-tools';

import { User } from '@domain/entities/user.entity';

import {
	CreateToolResponse,
	FindToolByIdResponse,
	ListToolsResponse,
} from '@infra/docs/responses/types/tool';
import { AuthedUser } from '@infra/http/auth/decorators/authed-user.decorator';
import { JWTAuthGuard } from '@infra/http/auth/guards/jwt-auth.guard';
import { SessionAuthGuard } from '@infra/http/auth/guards/session-auth.guard';
import { CreateToolDto } from '@infra/http/dtos/tool';

@ApiTags('tools')
@Controller('tools')
@UseGuards(SessionAuthGuard, JWTAuthGuard)
export class ToolController {
	constructor(
		private readonly createToolUseCase: CreateToolUseCase,
		private readonly deleteToolUseCase: DeleteToolUseCase,
		private readonly findToolUseCase: FindToolByIdUseCase,
		private readonly listToolsUseCase: ListToolsUseCase,
	) {}

	@ApiOperation({
		description: 'Creates a new Tool.',
	})
	@ApiBody({
		description: 'Properties to create a Tool.',
		type: CreateToolDto,
		required: true,
	})
	@ApiBadRequestResponse({
		description: 'A Tool has already been registered with given title or link.',
	})
	@ApiCreatedResponse({
		description: 'A Tool has been successfully created.',
		type: CreateToolResponse,
	})
	@Post()
	public async createToolRoute(
		@AuthedUser() user: User,
		@Body() body: CreateToolDto,
	): Promise<ToolVMResponse> {
		const { tool } = await this.createToolUseCase.exec({
			...body,
			userId: user.id,
		});

		return ToolViewModel.toHTTP(tool);
	}

	@ApiOperation({
		description: 'Deletes a Tool.',
	})
	@ApiParam({
		name: 'id',
		description: 'The ID of the Tool to be deleted.',
		required: true,
	})
	@ApiBadRequestResponse({
		description: 'No Tool has been found with given ID.',
	})
	@ApiCreatedResponse({
		description: 'A Tool has been successfully deleted.',
	})
	@Delete(':id')
	public async deleteToolRoute(
		@AuthedUser() user: User,
		@Param('id') id: string,
	): Promise<void> {
		return this.deleteToolUseCase.exec({
			id,
			userId: user.id,
		});
	}

	@ApiOperation({
		description: 'Find a tool by its ID.',
	})
	@ApiParam({
		name: 'id',
		description: 'The ID of the Tool to be found.',
		required: true,
	})
	@ApiBadRequestResponse({
		description: 'No Tool has been found with given ID.',
	})
	@ApiOkResponse({
		description: 'A Tool has been successfully found.',
		type: FindToolByIdResponse,
	})
	@Get(':id')
	public async findToolRoute(
		@AuthedUser() user: User,
		@Param('id') id: string,
	): Promise<ToolVMResponse> {
		const { tool } = await this.findToolUseCase.exec({
			id,
			userId: user.id,
		});

		return ToolViewModel.toHTTP(tool);
	}

	@ApiOperation({
		description: 'List all registered Tools.',
	})
	@ApiHeader({
		name: 'tag',
		description: 'List only tools that contain this tag.',
		required: false,
		example: 'organization',
	})
	@ApiBadRequestResponse({
		description: 'No Tool records were found in the database.',
	})
	@ApiOkResponse({
		description: 'All Tool records found in the database.',
		isArray: true,
		type: ListToolsResponse,
	})
	@Get()
	public async listToolsRoute(
		@AuthedUser() user: User,
		@Query('tag') tag: string,
	): Promise<ToolVMResponse[]> {
		const { tools } = await this.listToolsUseCase.exec({
			userId: user.id,
			tag,
		});

		return tools.map(ToolViewModel.toHTTP);
	}
}
