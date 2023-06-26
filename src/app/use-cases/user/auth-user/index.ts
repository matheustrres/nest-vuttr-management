import { CompareStrings } from '@data/contracts/hash';
import { FindUserByEmailRepository } from '@data/contracts/repositories/user';

import { UserAuthenticationError } from '@domain/errors/user/user-auth.error';
import {
	IAuthUserRequest,
	IAuthUserResponse,
	IAuthUserUseCase,
} from '@domain/use-cases/user/auth-user.use-case';

type Hasher = CompareStrings;
type UserRepository = FindUserByEmailRepository;

export class AuthUserUseCase implements IAuthUserUseCase {
	private static authErrMessage = 'Invalid credentials. Please, try again!';

	constructor(private hasher: Hasher, private userRepository: UserRepository) {}

	public async exec(request: IAuthUserRequest): Promise<IAuthUserResponse> {
		const user = await this.userRepository.findByEmail(request.email);

		if (!user) {
			throw new UserAuthenticationError(AuthUserUseCase.authErrMessage);
		}

		const isValidPassword = await this.hasher.compareStrings({
			plainText: request.password,
			hash: user.password,
		});

		if (!isValidPassword) {
			throw new UserAuthenticationError(AuthUserUseCase.authErrMessage);
		}

		return {
			user,
		};
	}
}
