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
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags,
	ApiUnauthorizedResponse,
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
import { paginate } from '@infra/http/utils/paginate.util';

@ApiTags('tools')
@ApiBearerAuth()
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
	@ApiUnauthorizedResponse({
		description:
			'No authentication token or an invalid token has been entered in the authentication header.',
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
	@ApiUnauthorizedResponse({
		description:
			'No authentication token or an invalid token has been entered in the authentication header.',
	})
	@ApiBadRequestResponse({
		description: 'No Tool has been found with given ID.',
	})
	@ApiOkResponse({
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
	@ApiUnauthorizedResponse({
		description:
			'No authentication token or an invalid token has been entered in the authentication header.',
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
	@ApiQuery({
		name: 'tag',
		description: 'List only tools that contain this tag.',
		required: false,
		example: 'organization',
	})
	@ApiQuery({
		name: 'skip',
		description: 'Offset where from entities should be taken.',
		required: false,
		example: '2',
	})
	@ApiQuery({
		name: 'take',
		description: 'Max number of entities should be taken.',
		required: false,
		example: '1',
	})
	@ApiUnauthorizedResponse({
		description:
			'No authentication token or an invalid token has been entered in the authentication header.',
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
		@Query('tag') tag?: string,
		@Query('skip') skip?: number,
		@Query('take') take?: number,
	): Promise<ToolVMResponse[]> {
		const pgt = paginate({ skip, take });

		const { tools } = await this.listToolsUseCase.exec({
			userId: user.id,
			tag,
			skip: pgt.skip,
			take: pgt.take,
		});

		return tools.map(ToolViewModel.toHTTP);
	}
}
