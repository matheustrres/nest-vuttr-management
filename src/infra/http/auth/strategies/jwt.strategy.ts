import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as PassportJWTStrategy } from 'passport-jwt';

import { FindUserByEmailRepository } from '@data/contracts/repositories/user';

import { User } from '@domain/entities/user.entity';
import { UserAuthenticationError } from '@domain/errors/user/user-auth.error';

type JWTPayload = {
	sub: string;
	iat: number;
	exp: number;
};

@Injectable()
export class JWTStrategy extends PassportStrategy(PassportJWTStrategy, 'jwt') {
	constructor(private readonly userRepository: FindUserByEmailRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromAuthHeaderAsBearerToken(),
			]),
			secretOrKey: process.env.JWT_SECRET,
			ignoreExpiration: false,
			passReqToCallback: false,
		});
	}

	public async validate(payload: JWTPayload): Promise<User> {
		const user = await this.userRepository.findByEmail(payload.sub);

		if (!user) {
			throw new UserAuthenticationError('Invalid credentials!');
		}

		return user;
	}
}
