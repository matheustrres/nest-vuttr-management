import {
	DeleteToolRepository,
	FindToolByIdRepository,
} from '@data/contracts/repositories/tool';

import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';
import {
	DeleteToolRequest,
	IDeleteToolUseCase,
} from '@domain/use-cases/tool/delete-tool.use-case';

type ToolRepository = FindToolByIdRepository & DeleteToolRepository;

export class DeleteToolUseCase implements IDeleteToolUseCase {
	constructor(private toolRepository: ToolRepository) {}

	public async exec(request: DeleteToolRequest): Promise<void> {
		const tool = await this.toolRepository.findById({
			id: request.id,
			userId: request.userId,
		});

		if (!tool) {
			throw new ToolNotFoundError(
				`No tool were found with id "${request.id}".`,
			);
		}

		return this.toolRepository.delete({
			id: request.id,
			userId: request.userId,
		});
	}
}
