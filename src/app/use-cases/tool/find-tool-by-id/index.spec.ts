import { MockProxy, mock } from 'jest-mock-extended';

import { GetCacheKey, SetCacheKey } from '@data/contracts/cache';
import { FindToolByIdRepository } from '@data/contracts/repositories/tool';

import { Tool } from '@domain/entities/tool.entity';
import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';

import { makeTool } from '@tests/factories/entities/tool.factory';

import { FindToolByIdUseCase } from '.';

describe('FindToolById [use case]', (): void => {
	let cacheManager: MockProxy<GetCacheKey & SetCacheKey>;
	let toolRepository: MockProxy<FindToolByIdRepository>;
	let sut: FindToolByIdUseCase;

	const tools: Tool[] = [
		makeTool({
			id: '2nd_random_tool_id',
			userId: '2nd_random_user_id',
			title: 'Notion',
		}),
		makeTool({
			id: '3rd_random_tool_id',
			userId: '3rd_random_user_id',
			title: 'Github',
		}),
	];

	beforeAll((): void => {
		cacheManager = mock();
		toolRepository = mock();

		cacheManager.get
			.mockResolvedValueOnce(undefined)
			.mockResolvedValueOnce(undefined)
			.mockResolvedValueOnce(tools[1]);

		toolRepository.findById
			.mockResolvedValueOnce(null)
			.mockResolvedValueOnce(tools[0]);
	});

	beforeEach((): void => {
		sut = new FindToolByIdUseCase(cacheManager, toolRepository);
	});

	it('should throw when searching for a non-existing tool', async (): Promise<void> => {
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
	});

	it('should return a tool', async (): Promise<void> => {
		const { tool } = await sut.exec({
			id: '2nd_random_tool_id',
			userId: '2nd_random_user_id',
		});

		const key = '--vuttr/users:2nd_random_user_id/tools:2nd_random_tool_id';

		expect(cacheManager.get).toHaveBeenNthCalledWith(2, key);
		expect(toolRepository.findById).toHaveBeenNthCalledWith(2, {
			id: '2nd_random_tool_id',
			userId: '2nd_random_user_id',
		});
		expect(cacheManager.set).toHaveBeenNthCalledWith(1, key, tools[0]);

		expect(tool.id).toBe('2nd_random_tool_id');
		expect(tool.title).toBe('Notion');
		expect(tool.userId).toBe('2nd_random_user_id');
	});

	it('should return a cached tool', async (): Promise<void> => {
		const { tool } = await sut.exec({
			id: '3rd_random_tool_id',
			userId: '3rd_random_user_id',
		});

		const key = '--vuttr/users:3rd_random_user_id/tools:3rd_random_tool_id';

		expect(cacheManager.get).toHaveBeenNthCalledWith(3, key);
		expect(toolRepository.findById).not.toHaveBeenNthCalledWith(3, {
			id: '3rd_random_tool_id',
			userId: '3rd_random_user_id',
		});
		expect(cacheManager.set).not.toHaveBeenCalledTimes(2);

		expect(tool.id).toBe('3rd_random_tool_id');
		expect(tool.title).toBe('Github');
		expect(tool.userId).toBe('3rd_random_user_id');
	});
});
