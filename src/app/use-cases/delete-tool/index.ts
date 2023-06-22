import {
	DeleteToolRepository,
	FindToolByIdRepository,
} from '@data/repositories/tool';

import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';
import {
	DeleteToolRequest,
	IDeleteToolUseCase,
} from '@domain/use-cases/delete-tool.use-case';

type ToolRepository = FindToolByIdRepository & DeleteToolRepository;

export class DeleteToolUseCase implements IDeleteToolUseCase {
	constructor(private toolRepository: ToolRepository) {}

	public async exec(request: DeleteToolRequest): Promise<void> {
		const tool = await this.toolRepository.findById(request.id);

		if (!tool) {
			throw new ToolNotFoundError(
				`No tool were found with id "${request.id}".`,
			);
		}

		return this.toolRepository.delete(tool.id);
	}
}
