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
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

import { ToolVMResponse, ToolViewModel } from '../view-models/tool.view-model';

import { CreateToolUseCase } from '@app/use-cases/create-tool';
import { DeleteToolUseCase } from '@app/use-cases/delete-tool';
import { ListToolsUseCase } from '@app/use-cases/list-tools';

import { CreateToolResponse } from '@infra/docs/responses/types/create-tool.response';
import { CreateToolDto } from '@infra/http/dtos/create-tool.dto';

@ApiTags('tools')
@Controller('tools')
export class ToolController {
	constructor(
		private readonly createToolUseCase: CreateToolUseCase,
		private readonly deleteToolUseCase: DeleteToolUseCase,
		private readonly listToolsUseCase: ListToolsUseCase,
	) {}

	@ApiOperation({
		description: 'Creates a new Tool',
	})
	@ApiBody({
		description: 'Properties to create a Tool',
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

		return new ToolViewModel().toHTTP(tool);
	}

	@Delete(':id')
	public async deleteToolRoute(@Param('id') id: string): Promise<void> {
		return this.deleteToolUseCase.exec({ id });
	}

	@Get()
	public async listToolsRoute(
		@Query('tag') tag: string,
	): Promise<ToolVMResponse[]> {
		const { tools } = await this.listToolsUseCase.exec({ tag });

		return new ToolViewModel().mapArrayToHTTP(tools);
	}
}
