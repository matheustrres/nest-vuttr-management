import { MockProxy, mock } from 'jest-mock-extended';

import {
	CreateUserRepository,
	FindUserByEmailRepository,
} from '@data/contracts/repositories/user';

import { UserFoundError } from '@domain/errors/user/user-found.error';

import { makeUser } from '@tests/factories/entities/user.factory';

import { CreateUserUseCase } from '.';

describe('CreateUser [use case]', (): void => {
	let userRepository: MockProxy<
		CreateUserRepository & FindUserByEmailRepository
	>;
	let sut: CreateUserUseCase;

	beforeAll((): void => {
		userRepository = mock();

		userRepository.findByEmail.mockResolvedValueOnce(
			makeUser({
				email: 'adamsmith@gmail.com',
			}),
		);
	});

	beforeEach((): void => {
		sut = new CreateUserUseCase(userRepository);
	});

	it('should throw when creating a user with an already registered email', async (): Promise<void> => {
		const email = 'adamsmith@gmail.com';

		const promise = sut.exec({
			name: 'Adam Smith',
			email,
			password: 'supersecretpassword',
		});

		await expect(promise).rejects.toThrow(
			new UserFoundError(`User already exists with email "${email}".`),
		);

		expect(userRepository.findByEmail).toHaveBeenNthCalledWith(1, email);
	});
});
