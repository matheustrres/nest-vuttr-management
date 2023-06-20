import { MockProxy, mock } from 'jest-mock-extended';

import {
	CreateToolRepository,
	FindToolByLinkRepository,
	FindToolByTitleRepository,
} from '@data/repositories/tool';

import { ToolFoundError } from '@domain/errors/tool/tool-found.error';

import { makeTool } from '@tests/factories/entities/tool.factory';

import { CreateToolUseCase } from '.';

describe('CreateTool [use case]', (): void => {
	let toolRepository: MockProxy<
		CreateToolRepository & FindToolByLinkRepository & FindToolByTitleRepository
	>;
	let sut: CreateToolUseCase;

	beforeAll((): void => {
		toolRepository = mock();

		toolRepository.findByTitle.mockResolvedValueOnce(
			makeTool({
				title: 'json-server',
			}),
		);
	});

	beforeEach((): void => {
		sut = new CreateToolUseCase(toolRepository);
	});

	it('should throw when creating a tool with an already registered title', (): void => {
		expect(
			sut.exec({
				title: 'json-server',
				link: 'https://github.com/typicode/json-server',
				description:
					'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
				tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
			}),
		).rejects.toThrow(
			new ToolFoundError('Tool already exists with title "json-server".'),
		);
	});
});
