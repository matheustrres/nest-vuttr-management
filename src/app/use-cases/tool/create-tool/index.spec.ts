import { MockProxy, mock } from 'jest-mock-extended';

import { SetCacheKey } from '@data/contracts/cache';
import {
	CreateToolRepository,
	FindToolByLinkRepository,
	FindToolByTitleRepository,
} from '@data/contracts/repositories/tool';

import { ToolFoundError } from '@domain/errors/tool/tool-found.error';

import { makeTool } from '@tests/factories/entities/tool.factory';

import { CreateToolUseCase } from '.';

describe('CreateTool [use case]', (): void => {
	let cacheManager: MockProxy<SetCacheKey>;
	let toolRepository: MockProxy<
		CreateToolRepository & FindToolByLinkRepository & FindToolByTitleRepository
	>;

	let sut: CreateToolUseCase;

	beforeAll((): void => {
		cacheManager = mock();
		toolRepository = mock();

		toolRepository.findByTitle
			.mockResolvedValueOnce(
				makeTool({
					title: 'json-server',
				}),
			)
			.mockResolvedValueOnce(null)
			.mockResolvedValueOnce(null);

		toolRepository.findByLink
			.mockResolvedValueOnce(
				makeTool({
					link: 'https://www.fastify.io/',
				}),
			)
			.mockResolvedValueOnce(null);
	});

	beforeEach((): void => {
		sut = new CreateToolUseCase(cacheManager, toolRepository);
	});

	it('should throw when creating a tool with an already registered title', async (): Promise<void> => {
		const title = 'json-server';

		const promise = sut.exec({
			title,
			link: 'https://github.com/typicode/json-server',
			description: 'json-server random description',
			tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
			userId: 'fake_user_id',
		});

		await expect(promise).rejects.toThrow(
			new ToolFoundError(`Tool already exists with title "${title}".`),
		);

		expect(toolRepository.findByTitle).toHaveBeenNthCalledWith(1, {
			title: 'json-server',
			userId: 'fake_user_id',
		});
		expect(toolRepository.findByLink).not.toHaveBeenCalled();
		expect(cacheManager.set).not.toHaveBeenCalled();
	});

	it('should throw when creating a tool with an already registered link', async (): Promise<void> => {
		const link = 'https://www.fastify.io/';

		const promise = sut.exec({
			title: 'Fastify',
			link,
			description: 'Fastify random description',
			tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost'],
			userId: 'fake_user_id',
		});

		await expect(promise).rejects.toThrow(
			new ToolFoundError(`Tool already exists with link "${link}".`),
		);

		expect(toolRepository.findByTitle).toHaveBeenNthCalledWith(2, {
			title: 'Fastify',
			userId: 'fake_user_id',
		});
		expect(toolRepository.findByLink).toHaveBeenNthCalledWith(1, {
			link: 'https://www.fastify.io/',
			userId: 'fake_user_id',
		});
		expect(cacheManager.set).not.toHaveBeenCalled();
	});

	it('should create a tool', async (): Promise<void> => {
		const { tool } = await sut.exec({
			title: 'Notion',
			link: 'https://notion.so',
			description: 'Notion random description',
			tags: [
				'organization',
				'planning',
				'collaboration',
				'writing',
				'calendar',
			],
			userId: 'random_user_id',
		});

		expect(toolRepository.create).toHaveBeenNthCalledWith(1, tool);
		expect(toolRepository.findByTitle).toHaveBeenNthCalledWith(3, {
			title: 'Notion',
			userId: 'random_user_id',
		});
		expect(toolRepository.findByLink).toHaveBeenNthCalledWith(2, {
			link: 'https://notion.so',
			userId: 'random_user_id',
		});
		expect(cacheManager.set).toHaveBeenNthCalledWith(
			1,
			`--vuttr/users:random_user_id/tools:${tool.id}`,
			tool,
		);

		expect(tool).toBeDefined();
		expect(tool.id).toBeDefined();
		expect(tool.createdAt).toBeDefined();
		expect(tool.title).toBe('Notion');
		expect(tool.link).toBe('https://notion.so');
		expect(tool.tags.length).toBe(5);
	});
});
