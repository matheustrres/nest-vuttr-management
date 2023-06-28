import { CompareStrings } from '@data/contracts/hash';
import { FindUserByEmailRepository } from '@data/contracts/repositories/user';

import { UserAuthenticationError } from '@domain/errors/user/user-auth.error';
import {
	ILoginUserRequest,
	ILoginUserResponse,
	ILoginUserUseCase,
} from '@domain/use-cases/user/login-user.use-case';

type Hasher = CompareStrings;
type UserRepository = FindUserByEmailRepository;

export class LoginUserUseCase implements ILoginUserUseCase {
	private static authErrMessage = 'Invalid credentials. Please, try again!';

	constructor(private hasher: Hasher, private userRepository: UserRepository) {}

	public async exec(request: ILoginUserRequest): Promise<ILoginUserResponse> {
		const user = await this.userRepository.findByEmail(request.email);

		if (!user) {
			throw new UserAuthenticationError(LoginUserUseCase.authErrMessage);
		}

		const isValidPassword = await this.hasher.compareStrings({
			plainText: request.password,
			hash: user.password,
		});

		if (!isValidPassword) {
			throw new UserAuthenticationError(LoginUserUseCase.authErrMessage);
		}

		return {
			user,
		};
	}
}
