import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

import { FindUserByEmailRepository } from '@data/contracts/repositories/user';

import { User } from '@domain/entities/user.entity';

type JWTPayload = {
	sub: string;
	iat: number;
	exp: number;
};

@Injectable()
export class JWTAuthGuard
	extends PassportAuthGuard('jwt')
	implements CanActivate
{
	constructor(
		private readonly userRepository: FindUserByEmailRepository,
		private readonly jwtService: JwtService,
	) {
		super();
	}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest() as Request;
		const token = this.extractTokenFromHeader(request.headers);

		if (!token) {
			throw new UnauthorizedException(
				this.getJWTErrorMessage('JsonWebTokenNotFoundError'),
			);
		}

		let payload: JWTPayload;

		try {
			payload = (await this.jwtService.verify(token)) as JWTPayload;
		} catch (error) {
			const { name } = error as Error;

			throw new UnauthorizedException(this.getJWTErrorMessage(name));
		}

		const output = await this.userRepository.findByEmail(payload.sub);

		request.user = output as User;

		return true;
	}

	private extractTokenFromHeader(
		headers: IncomingHttpHeaders,
	): string | undefined {
		const [type, token] = headers.authorization?.split(' ') ?? [];

		return type === 'Bearer' ? token : undefined;
	}

	private getJWTErrorMessage(errorName: string): string {
		return (
			{
				JsonWebTokenError: 'Invalid authentication token signature',
				JsonWebTokenNotFoundError:
					'No authentication token found in the authentication header.',
				TokenExpiredError: 'Authentication token is expired.',
			}[errorName] || 'Invalid authentication token.'
		);
	}
}
