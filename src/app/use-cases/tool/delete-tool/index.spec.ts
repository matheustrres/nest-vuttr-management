import { MockProxy, mock } from 'jest-mock-extended';

import {
	DeleteToolRepository,
	FindToolByIdRepository,
} from '@data/contracts/repositories/tool';

import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';

import { makeTool } from '@tests/factories/entities/tool.factory';

import { DeleteToolUseCase } from '.';

describe('DeleteTool [use case]', (): void => {
	let toolRepository: MockProxy<FindToolByIdRepository & DeleteToolRepository>;
	let sut: DeleteToolUseCase;

	beforeAll((): void => {
		toolRepository = mock();

		toolRepository.findById.mockResolvedValueOnce(null).mockResolvedValueOnce(
			makeTool({
				id: 'random_tool_id',
				title: 'Swagger',
				description: 'API Documentation & Design Tools for Teams',
				link: 'https://swagger.io/',
			}),
		);
	});

	beforeEach((): void => {
		sut = new DeleteToolUseCase(toolRepository);
	});

	it('should throw when trying to delete a non-existing tool with an id', async (): Promise<void> => {
		const promise = sut.exec({
			id: 'fake_tool_id',
		});

		await expect(promise).rejects.toThrow(
			new ToolNotFoundError('No tool were found with id "fake_tool_id".'),
		);

		expect(toolRepository.findById).toHaveBeenNthCalledWith(1, 'fake_tool_id');
	});

	it('should delete a tool by id', async (): Promise<void> => {
		await sut.exec({
			id: 'random_tool_id',
		});

		expect(toolRepository.findById).toHaveBeenNthCalledWith(
			2,
			'random_tool_id',
		);
		expect(toolRepository.delete).toHaveBeenNthCalledWith(1, 'random_tool_id');
	});
});
