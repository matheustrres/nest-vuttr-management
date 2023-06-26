import { MockProxy, mock } from 'jest-mock-extended';

import { CompareStrings } from '@data/contracts/hash';
import { FindUserByEmailRepository } from '@data/contracts/repositories/user';

import { UserAuthenticationError } from '@domain/errors/user/user-auth.error';

import { AuthUserUseCase } from '.';

describe('AuthUser [use case]', (): void => {
	let hasher: MockProxy<CompareStrings>;
	let userRepository: MockProxy<FindUserByEmailRepository>;

	let sut: AuthUserUseCase;

	beforeAll((): void => {
		hasher = mock();
		userRepository = mock();

		userRepository.findByEmail.mockResolvedValueOnce(null);
	});

	beforeEach((): void => {
		sut = new AuthUserUseCase(hasher, userRepository);
	});

	it('should throw when authenticating a non-existing user', async (): Promise<void> => {
		const promise = sut.exec({
			email: 'fake_email',
			password: 'superrandompassword',
		});

		await expect(promise).rejects.toThrow(
			new UserAuthenticationError('Invalid credentials. Please, try again!'),
		);

		expect(userRepository.findByEmail).toHaveBeenNthCalledWith(1, 'fake_email');
	});
});
