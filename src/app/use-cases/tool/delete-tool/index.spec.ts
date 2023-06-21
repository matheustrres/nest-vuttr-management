import { MockProxy, mock } from 'jest-mock-extended';

import {
	DeleteToolRepository,
	FindToolByIdRepository,
} from '@data/repositories/tool';

import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';

import { DeleteToolUseCase } from '.';

describe('DeleteTool [use case]', (): void => {
	let toolRepository: MockProxy<FindToolByIdRepository & DeleteToolRepository>;
	let sut: DeleteToolUseCase;

	beforeAll((): void => {
		toolRepository = mock();

		toolRepository.findById.mockResolvedValueOnce(undefined);
	});

	beforeEach((): void => {
		sut = new DeleteToolUseCase(toolRepository);
	});

	it('should throw when trying to delete a non-existing tool with an id', (): void => {
		expect(
			sut.exec({
				id: 'fake_tool_id',
			}),
		).rejects.toThrow(
			new ToolNotFoundError('No tool were found with id "fake_tool_id".'),
		);
	});
});
