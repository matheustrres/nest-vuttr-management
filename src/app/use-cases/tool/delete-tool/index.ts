import { BaseUseCase, GetCacheKeyInput } from '@app/use-cases/base.use-case';

import { DeleteCacheKey, GetCacheKey } from '@data/contracts/cache';
import {
	DeleteToolRepository,
	FindToolByIdRepository,
} from '@data/contracts/repositories/tool';

import { Tool } from '@domain/entities/tool.entity';
import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';
import {
	DeleteToolRequest,
	IDeleteToolUseCase,
} from '@domain/use-cases/tool/delete-tool.use-case';

type CacheManager = GetCacheKey & DeleteCacheKey;
type ToolRepository = FindToolByIdRepository & DeleteToolRepository;

export class DeleteToolUseCase
	extends BaseUseCase
	implements IDeleteToolUseCase
{
	constructor(
		private cacheManager: CacheManager,
		private toolRepository: ToolRepository,
	) {
		super();
	}

	public async exec(request: DeleteToolRequest): Promise<void> {
		const key = this.getCacheKey({
			toolId: request.id,
			userId: request.userId,
		});

		const cachedTool = await this.cacheManager.get<Tool>(key);

		if (cachedTool) {
			await this.cacheManager.del(key);
		}

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

	protected getCacheKey(input: GetCacheKeyInput): string {
		return `--vuttr/users:${input.userId}/tools:${input.toolId}`;
	}
}
