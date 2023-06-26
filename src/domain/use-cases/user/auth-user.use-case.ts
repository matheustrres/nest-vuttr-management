import { User } from '@domain/entities/user.entity';

export type IAuthUserRequest = {
	email: string;
	password: string;
};

export type IAuthUserResponse = {
	user: User;
};

export interface IAuthUserUseCase {
	exec: (request: IAuthUserRequest) => Promise<IAuthUserResponse>;
}
