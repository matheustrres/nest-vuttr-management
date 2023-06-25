import { CreateUserRepository } from '@data/contracts/repositories/user/create-user.repository';
import { FindUserByEmailRepository } from '@data/contracts/repositories/user/find-user.repository';

import { User } from '@domain/entities/user.entity';
import { UserFoundError } from '@domain/errors/user/user-found.error';
import {
	ICreateUserRequest,
	ICreateUserResponse,
	ICreateUserUseCase,
} from '@domain/use-cases/user/create-user.use-case';

type UserRepository = CreateUserRepository & FindUserByEmailRepository;

export class CreateUserUseCase implements ICreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	public async exec(request: ICreateUserRequest): Promise<ICreateUserResponse> {
		const userFoundByEmail = await this.userRepository.findByEmail(
			request.email,
		);

		if (userFoundByEmail) {
			throw new UserFoundError(
				`User already exists with email "${request.email}".`,
			);
		}

		const user = new User(request);

		await this.userRepository.create(user);

		return {
			user,
		};
	}
}
