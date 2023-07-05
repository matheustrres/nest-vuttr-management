import { MockProxy, mock } from 'jest-mock-extended';

import { DeleteCacheKey, GetCacheKey } from '@data/contracts/cache';
import {
	DeleteToolRepository,
	FindToolByIdRepository,
} from '@data/contracts/repositories/tool';

import { Tool } from '@domain/entities/tool.entity';
import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';

import { makeTool } from '@tests/factories/entities/tool.factory';

import { DeleteToolUseCase } from '.';

describe('DeleteTool [use case]', (): void => {
	let cacheManager: MockProxy<GetCacheKey & DeleteCacheKey>;
	let toolRepository: MockProxy<FindToolByIdRepository & DeleteToolRepository>;

	let sut: DeleteToolUseCase;

	beforeAll((): void => {
		cacheManager = mock();
		toolRepository = mock();

		const tool = makeTool({
			id: 'random_tool_id',
			userId: 'random_user_id',
		});

		cacheManager.get
			.mockResolvedValueOnce(undefined)
			.mockResolvedValueOnce(tool);

		toolRepository.findById
			.mockResolvedValueOnce(null)
			.mockResolvedValueOnce(tool);
	});

	beforeEach((): void => {
		sut = new DeleteToolUseCase(cacheManager, toolRepository);
	});

	it('should throw when trying to delete a non-existing tool', async (): Promise<void> => {
		const promise = sut.exec({
			id: 'fake_tool_id',
			userId: 'fake_user_id',
		});

		await expect(promise).rejects.toThrow(
			new ToolNotFoundError('No tool were found with id "fake_tool_id".'),
		);

		const key = '--vuttr/users:fake_user_id/tools:fake_tool_id';

		expect(cacheManager.get).toHaveBeenNthCalledWith(1, key);
		expect(toolRepository.findById).toHaveBeenNthCalledWith(1, {
			id: 'fake_tool_id',
			userId: 'fake_user_id',
		});
		expect(cacheManager.del).not.toHaveBeenCalled();
	});

	it('should delete a tool by id', async (): Promise<void> => {
		await sut.exec({
			id: 'random_tool_id',
			userId: 'random_user_id',
		});

		const key = '--vuttr/users:random_user_id/tools:random_tool_id';

		expect(cacheManager.get).toHaveBeenNthCalledWith(2, key);
		expect(cacheManager.del).toHaveBeenNthCalledWith(1, key);
		expect(toolRepository.findById).toHaveBeenNthCalledWith(2, {
			id: 'random_tool_id',
			userId: 'random_user_id',
		});
		expect(toolRepository.delete).toHaveBeenNthCalledWith(1, {
			id: 'random_tool_id',
			userId: 'random_user_id',
		});
	});
});
