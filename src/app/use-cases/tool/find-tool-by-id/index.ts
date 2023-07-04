import { BaseUseCase } from '@app/use-cases/base.use-case';

import { GetCacheKey, SetCacheKey } from '@data/contracts/cache';
import { FindToolByIdRepository } from '@data/contracts/repositories/tool';

import { Tool } from '@domain/entities/tool.entity';
import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';
import {
	IFindToolByIdRequest,
	IFindToolByIdResponse,
	IFindToolByIdUseCase,
} from '@domain/use-cases/tool/find-tool-by-id.use-case';

type CacheManager = GetCacheKey & SetCacheKey;
type ToolRepository = FindToolByIdRepository;

export class FindToolByIdUseCase
	extends BaseUseCase
	implements IFindToolByIdUseCase
{
	constructor(
		private cacheManager: CacheManager,
		private toolRepository: ToolRepository,
	) {
		super();
	}

	public async exec(
		request: IFindToolByIdRequest,
	): Promise<IFindToolByIdResponse> {
		const key = this.getCacheKey({
			toolId: request.id,
			userId: request.userId,
		});

		const cachedTool = await this.cacheManager.get<Tool>(key);

		if (cachedTool) {
			return {
				tool: cachedTool,
			};
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

		await this.cacheManager.set<Tool>(key, tool);

		return {
			tool,
		};
	}

	protected getCacheKey(input: GetCacheKeyInput): string {
		return `--vuttr/users:${input.userId}/tools:${input.toolId}`;
	}
}

type GetCacheKeyInput = {
	userId: string;
	toolId: string;
};
