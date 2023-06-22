import { ListToolsRepository } from '@data/contracts/repositories';

import { Tool } from '@domain/entities/tool.entity';
import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';
import {
	IListToolsRequest,
	IListToolsResponse,
	IListToolsUseCase,
} from '@domain/use-cases/list-tools.use-case';

type ToolRepository = ListToolsRepository;

export class ListToolsUseCase implements IListToolsUseCase {
	constructor(private toolRepository: ToolRepository) {}

	public async exec(request?: IListToolsRequest): Promise<IListToolsResponse> {
		const tools: Tool[] = await this.toolRepository.listTools({
			tag: request?.tag,
		});

		if (!tools.length) {
			throw new ToolNotFoundError('No tools were found.');
		}

		return {
			tools,
		};
	}
}
