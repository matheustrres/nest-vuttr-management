import { MockProxy, mock } from 'jest-mock-extended';

import { ListToolsRepository } from '@data/repositories/tool';

import { ToolNotFoundError } from '@domain/errors/tool/tool-not-found.error';

import { ListToolsUseCase } from '.';

describe('ListTools [use case]', (): void => {
	let toolRepository: MockProxy<ListToolsRepository>;
	let sut: ListToolsUseCase;

	beforeAll((): void => {
		toolRepository = mock();

		toolRepository.listTools.mockResolvedValueOnce([]);
	});

	beforeEach((): void => {
		sut = new ListToolsUseCase(toolRepository);
	});

	it('should throw when listing tools and there is no data', async (): Promise<void> => {
		const promise = sut.exec();

		await expect(promise).rejects.toThrow(
			new ToolNotFoundError('No tools were found.'),
		);

		expect(toolRepository.listTools).toHaveBeenCalledTimes(1);
	});
});
