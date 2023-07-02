import { MockProxy, mock } from 'jest-mock-extended';

import { ListToolsRepository } from '@data/contracts/repositories/tool';

import { Tool } from '@domain/entities/tool.entity';
import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';

import { makeTool } from '@tests/factories/entities/tool.factory';

import { ListToolsUseCase } from '.';

describe('ListTools [use case]', (): void => {
	let toolRepository: MockProxy<ListToolsRepository>;
	let sut: ListToolsUseCase;

	const toolsArray: Tool[] = [
		makeTool({
			title: 'Notion',
			tags: [
				'organization',
				'planning',
				'collaboration',
				'writing',
				'calendar',
			],
		}),
		makeTool({
			title: 'Fastify',
			tags: ['web', 'framework', 'node', 'http2', 'https', 'localhost'],
		}),
		makeTool({
			title: 'json-server',
			tags: ['api', 'json', 'schema', 'github', 'rest'],
		}),
		makeTool({
			title: 'Prisma',
			tags: [
				'node',
				'javascript',
				'sql-server',
				'orm',
				'query-builder',
				'typescript',
			],
		}),
		makeTool({
			title: 'NestJS',
			tags: ['node', 'framework', 'javascript', 'microservices', 'typescript'],
		}),
		makeTool({
			title: 'Express',
			tags: ['node', 'javascript', 'express', 'server', 'framework'],
		}),
		makeTool({
			title: 'Github',
			tags: ['github', 'coding', 'developers', 'open-source', 'community'],
		}),
		makeTool({
			title: 'TypeORM',
			tags: [
				'javascript',
				'orm',
				'database',
				'websql',
				'data-mapper',
				'typescript',
			],
		}),
	];

	const tag = 'node';
	const skip = 2;
	const take = 5;

	beforeAll((): void => {
		toolRepository = mock();

		toolRepository.listTools
			.mockResolvedValueOnce([])
			.mockResolvedValueOnce(toolsArray)
			.mockResolvedValueOnce(
				toolsArray.filter((tool): boolean => tool.tags.includes(tag)),
			)
			.mockResolvedValueOnce(
				toolsArray
					.slice(skip, skip + take)
					.filter((tool): boolean => tool.tags.includes(tag)),
			);
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

		expect(data.length).toBe(toolsArray.length);
		expect(data).toEqual(toolsArray);
	});

	it('should list all registered tools with specific tag', async (): Promise<void> => {
		const { tools: data } = await sut.exec({
			tag,
			userId: 'random_user_id',
		});

		expect(toolRepository.listTools).toHaveBeenNthCalledWith(3, {
			tag,
			userId: 'random_user_id',
		});

		expect(data.length).toBe(4);
		expect(data[0].title).toBe('Fastify');
		expect(data[1].title).toBe('Prisma');
		expect(data[2].title).toBe('NestJS');
		expect(data[3].title).toBe('Express');
	});

	it('should list all registered tools with specific tag and paginated', async (): Promise<void> => {
		const { tools: data } = await sut.exec({
			userId: 'random_user_id',
			tag: 'node',
			take,
			skip,
		});

		expect(toolRepository.listTools).toHaveBeenNthCalledWith(4, {
			userId: 'random_user_id',
			tag: 'node',
			take,
			skip,
		});

		expect(data.length).toBe(3);
		expect(data[0].title).toBe('Prisma');
		expect(data[1].title).toBe('NestJS');
		expect(data[2].title).toBe('Express');
	});
});
