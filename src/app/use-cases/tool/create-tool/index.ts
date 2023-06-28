import {
	CreateToolRepository,
	FindToolByLinkRepository,
	FindToolByTitleRepository,
} from '@data/contracts/repositories/tool';

import { Tool } from '@domain/entities/tool.entity';
import { ToolFoundError } from '@domain/errors/tool/tool-found.error';
import {
	ICreateToolRequest,
	ICreateToolResponse,
	ICreateToolUseCase,
} from '@domain/use-cases/tool/create-tool.use-case';

type ToolRepository = CreateToolRepository &
	FindToolByLinkRepository &
	FindToolByTitleRepository;

export class CreateToolUseCase implements ICreateToolUseCase {
	constructor(private toolRepository: ToolRepository) {}

	public async exec(request: ICreateToolRequest): Promise<ICreateToolResponse> {
		const toolFoundByTitle = await this.toolRepository.findByTitle({
			title: request.title,
			userId: request.userId,
		});

		if (toolFoundByTitle) {
			throw new ToolFoundError(
				`Tool already exists with title "${request.title}".`,
			);
		}

		const toolFoundByLink = await this.toolRepository.findByLink({
			link: request.link,
			userId: request.userId,
		});

		if (toolFoundByLink) {
			throw new ToolFoundError(
				`Tool already exists with link "${request.link}".`,
			);
		}

		const tool = new Tool(request);

		await this.toolRepository.create(tool);

		return {
			tool,
		};
	}
}
