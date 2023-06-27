import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';

import { AuthUserUseCase } from '@app/use-cases/user/auth-user';

import { User } from '@domain/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(
	PassportLocalStrategy,
	'local',
) {
	constructor(private readonly authUserUseCase: AuthUserUseCase) {
		super({
			usernameField: 'email',
			passReqToCallback: false,
		});
	}

	public async validate(email: string, password: string): Promise<User> {
		const { user } = await this.authUserUseCase.exec({
			email,
			password,
		});

		return user;
	}
}
