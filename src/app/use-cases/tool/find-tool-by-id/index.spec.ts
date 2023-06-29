import { MockProxy, mock } from 'jest-mock-extended';

import { FindToolByIdRepository } from '@data/contracts/repositories/tool';

import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';

import { FindToolByIdUseCase } from '.';

describe('FindToolById [use case]', (): void => {
	let toolRepository: MockProxy<FindToolByIdRepository>;
	let sut: FindToolByIdUseCase;

	beforeAll((): void => {
		toolRepository = mock();

		toolRepository.findById.mockResolvedValueOnce(null);
	});

	beforeEach((): void => {
		sut = new FindToolByIdUseCase(toolRepository);
	});

	it('should throw when searching for a tool with an invalid id', async (): Promise<void> => {
		const promise = sut.exec({
			id: 'fake_tool_id',
			userId: 'fake_user_id',
		});

		await expect(promise).rejects.toThrow(
			new ToolNotFoundError('No tool were found with id "fake_tool_id".'),
		);

		expect(toolRepository.findById).toHaveBeenNthCalledWith(1, {
			id: 'fake_tool_id',
			userId: 'fake_user_id',
		});
	});
});
