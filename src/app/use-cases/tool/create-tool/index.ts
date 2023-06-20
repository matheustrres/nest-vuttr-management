import { CreateToolRepository } from '@data/repositories/tool';

import { Tool } from '@domain/entities/tool.entity';
import {
	ICreateToolRequest,
	ICreateToolResponse,
	ICreateToolUseCase,
} from '@domain/use-cases/tool/create-tool.use.case';

type ToolRepository = CreateToolRepository;

export class CreateToolUseCase implements ICreateToolUseCase {
	constructor(private toolRepository: ToolRepository) {}

	public async exec(request: ICreateToolRequest): Promise<ICreateToolResponse> {
		const tool = new Tool(request);

		await this.toolRepository.create(tool);

		return {
			tool,
		};
	}
}
