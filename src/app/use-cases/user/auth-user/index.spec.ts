import { MockProxy, mock } from 'jest-mock-extended';

import { CompareStrings } from '@data/contracts/hash';
import { FindUserByEmailRepository } from '@data/contracts/repositories/user';

import { UserAuthenticationError } from '@domain/errors/user/user-auth.error';

import { makeUser } from '@tests/factories/entities/user.factory';

import { AuthUserUseCase } from '.';

describe('AuthUser [use case]', (): void => {
	let hasher: MockProxy<CompareStrings>;
	let userRepository: MockProxy<FindUserByEmailRepository>;

	let sut: AuthUserUseCase;

	beforeAll((): void => {
		hasher = mock();
		userRepository = mock();

		userRepository.findByEmail
			.mockResolvedValueOnce(null)
			.mockResolvedValueOnce(
				makeUser({
					email: 'adamsmith@gmail.com',
					password: 'super_secret_hashed_password_text',
				}),
			);

		hasher.compareStrings.mockResolvedValueOnce(false);
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
			new UserAuthenticationError('Invalid email address!'),
		);

		expect(userRepository.findByEmail).toHaveBeenNthCalledWith(1, 'fake_email');
	});

	it('should throw when incoming password is different from current password', async (): Promise<void> => {
		const promise = sut.exec({
			email: 'adamsmith@gmail.com',
			password: 'randompassword',
		});

		await expect(promise).rejects.toThrow(
			new UserAuthenticationError('Wrong password!'),
		);

		expect(userRepository.findByEmail).toHaveBeenNthCalledWith(
			2,
			'adamsmith@gmail.com',
		);
		expect(hasher.compareStrings).toHaveBeenNthCalledWith(1, {
			plainText: 'randompassword',
			hash: 'super_secret_hashed_password_text',
		});
	});
});
