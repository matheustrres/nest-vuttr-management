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

	beforeAll((): void => {
		toolRepository = mock();

		toolRepository.listTools
			.mockResolvedValueOnce([])
			.mockResolvedValueOnce(toolsArray);
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
});
