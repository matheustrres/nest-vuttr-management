import { User } from '@domain/entities/user.entity';

export type ICreateUserRequest = {
	name: string;
	email: string;
	password: string;
};

export type ICreateUserResponse = {
	user: User;
};

export interface ICreateUserUseCase {
	exec: (request: ICreateUserRequest) => Promise<ICreateUserResponse>;
}
