import { FindToolByIdRepository } from '@data/contracts/repositories/tool';

import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';
import {
	IFindToolByIdRequest,
	IFindToolByIdResponse,
	IFindToolByIdUseCase,
} from '@domain/use-cases/tool/find-tool-by-id.use-case';

type ToolRepository = FindToolByIdRepository;

export class FindToolByIdUseCase implements IFindToolByIdUseCase {
	constructor(private toolRepository: ToolRepository) {}

	public async exec(
		request: IFindToolByIdRequest,
	): Promise<IFindToolByIdResponse> {
		const tool = await this.toolRepository.findById({
			id: request.id,
			userId: request.userId,
		});

		if (!tool) {
			throw new ToolNotFoundError(
				`No tool were found with id "${request.id}".`,
			);
		}

		return {
			tool,
		};
	}
}
