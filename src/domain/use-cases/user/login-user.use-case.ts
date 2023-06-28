import { User } from '@domain/entities/user.entity';

export type ILoginUserRequest = {
	email: string;
	password: string;
};

export type ILoginUserResponse = {
	user: User;
};

export interface ILoginUserUseCase {
	exec: (request: ILoginUserRequest) => Promise<ILoginUserResponse>;
}
