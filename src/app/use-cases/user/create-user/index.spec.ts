import { MockProxy, mock } from 'jest-mock-extended';

import { HashString } from '@data/contracts/hash';
import {
	CreateUserRepository,
	FindUserByEmailRepository,
} from '@data/contracts/repositories/user';

import { UserFoundError } from '@domain/errors/user/user-found.error';

import { makeUser } from '@tests/factories/entities/user.factory';

import { CreateUserUseCase } from '.';

describe('CreateUser [use case]', (): void => {
	let hasher: MockProxy<HashString>;
	let userRepository: MockProxy<
		CreateUserRepository & FindUserByEmailRepository
	>;

	let sut: CreateUserUseCase;

	const hash = 'this_is_a_super_hashed_password_text';

	beforeAll((): void => {
		hasher = mock();
		userRepository = mock();

		userRepository.findByEmail
			.mockResolvedValueOnce(
				makeUser({
					email: 'adamsmith@gmail.com',
				}),
			)
			.mockResolvedValueOnce(null);

		hasher.hashString.mockResolvedValueOnce(hash);
	});

	beforeEach((): void => {
		sut = new CreateUserUseCase(hasher, userRepository);
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

	it('should create a user', async (): Promise<void> => {
		const { user } = await sut.exec({
			name: 'Allen Brown',
			email: 'allen.brown@gmail.com',
			password: 'youshallnotpass',
		});

		expect(userRepository.create).toHaveBeenNthCalledWith(1, user);

		expect(user.id).toBeDefined();
		expect(user.name).toBe('Allen Brown');
		expect(user.email).toBe('allen.brown@gmail.com');
		expect(user.password).toEqual(hash);
	});
});
