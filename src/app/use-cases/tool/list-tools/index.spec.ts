import { MockProxy, mock } from 'jest-mock-extended';

import { ListToolsRepository } from '@data/contracts/repositories/tool';

import { Tool } from '@domain/entities/tool.entity';
import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';

import { makeTool } from '@tests/factories/entities/tool.factory';

import { ListToolsUseCase } from '.';

describe('ListTools [use case]', (): void => {
	let toolRepository: MockProxy<ListToolsRepository>;
	let sut: ListToolsUseCase;

	const tools: Tool[] = [];

	const tag = 'node';

	beforeAll((): void => {
		tools.push(
			makeTool({
				title: 'Notion',
				link: 'https://notion.so',
			}),
			makeTool({
				title: 'fastify',
				link: 'https://www.fastify.io/',
				tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost'],
			}),
			makeTool({
				title: 'json-server',
				link: 'https://github.com/typicode/json-server',
				tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
			}),
		);

		toolRepository = mock();

		toolRepository.listTools
			.mockResolvedValueOnce([])
			.mockResolvedValueOnce(tools)
			.mockResolvedValueOnce(tools.filter((t) => t.tags.includes(tag)));
	});

	beforeEach((): void => {
		sut = new ListToolsUseCase(toolRepository);
	});

	it('should throw when listing tools and there is no data', async (): Promise<void> => {
		const promise = sut.exec({
			userId: 'random_user_id',
		});

		await expect(promise).rejects.toThrow(
			new ToolNotFoundError('No tools were found.'),
		);

		expect(toolRepository.listTools).toHaveBeenNthCalledWith(1, {
			userId: 'random_user_id',
		});
	});

	it('should list all registered tools', async (): Promise<void> => {
		const { tools: data } = await sut.exec({
			userId: 'random_user_id',
		});

		expect(toolRepository.listTools).toHaveBeenNthCalledWith(2, {
			userId: 'random_user_id',
		});

		expect(data.length).toBe(3);
		expect(data[0]).toEqual(tools[0]);
		expect(data[1]).toEqual(tools[1]);
		expect(data[2]).toEqual(tools[2]);
	});

	it('should list all registered tools with specified tag', async (): Promise<void> => {
		const { tools: data } = await sut.exec({
			tag,
			userId: 'random_user_id',
		});

		expect(toolRepository.listTools).toHaveBeenNthCalledWith(3, {
			tag,
			userId: 'random_user_id',
		});

		expect(data.length).toBe(2);
		expect(data[0]).toEqual(tools[1]);
		expect(data[1]).toEqual(tools[2]);
	});
});
