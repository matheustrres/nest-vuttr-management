import { ListToolsRepository } from '@data/repositories/tool';

import { Tool } from '@domain/entities/tool.entity';
import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';
import { IListToolsResponse, IListToolsUseCase } from '@domain/use-cases/tool';

type ToolRepository = ListToolsRepository;

export class ListToolsUseCase implements IListToolsUseCase {
	constructor(private toolRepository: ToolRepository) {}

	public async exec(): Promise<IListToolsResponse> {
		const tools: Tool[] = await this.toolRepository.listTools();

		if (!tools.length) {
			throw new ToolNotFoundError('No tools were found.');
		}

		return {
			tools,
		};
	}
}
