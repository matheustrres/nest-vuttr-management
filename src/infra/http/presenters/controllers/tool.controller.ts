import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
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
import { ListToolsUseCase } from '@app/use-cases/tool/list-tools';

import {
	CreateToolResponse,
	ListToolsResponse,
} from '@infra/docs/responses/types/tool';
import { CreateToolDto } from '@infra/http/dtos/tool';

@ApiTags('tools')
@Controller('tools')
export class ToolController {
	constructor(
		private readonly createToolUseCase: CreateToolUseCase,
		private readonly deleteToolUseCase: DeleteToolUseCase,
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
		@Body() body: CreateToolDto,
	): Promise<ToolVMResponse> {
		const { tool } = await this.createToolUseCase.exec(body);

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
	public async deleteToolRoute(@Param('id') id: string): Promise<void> {
		return this.deleteToolUseCase.exec({ id });
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
		@Query('tag') tag: string,
	): Promise<ToolVMResponse[]> {
		const { tools } = await this.listToolsUseCase.exec({ tag });

		return tools.map(ToolViewModel.toHTTP);
	}
}
