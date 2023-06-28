import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';

import { LoginUserUseCase } from '@app/use-cases/user/login-user';

import { User } from '@domain/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(
	PassportLocalStrategy,
	'local',
) {
	constructor(private readonly loginUserUseCase: LoginUserUseCase) {
		super({
			usernameField: 'email',
			passReqToCallback: false,
		});
	}

	public async validate(email: string, password: string): Promise<User> {
		const { user } = await this.loginUserUseCase.exec({
			email,
			password,
		});

		return user;
	}
}
