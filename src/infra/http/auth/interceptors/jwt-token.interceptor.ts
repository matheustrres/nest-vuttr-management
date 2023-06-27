import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

import { signJWTToken } from '../helpers/sign-jwt-token.helper';

import { cookieConfig } from '@config/cookie.config';

import { User } from '@domain/entities/user.entity';

@Injectable()
export class JWTTokenInterceptor implements NestInterceptor {
	public intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> {
		return next.handle().pipe(
			map((user: User): User => {
				const response = context.switchToHttp().getResponse() as Response;
				const token = signJWTToken(user.email);

				response.setHeader('Authorization', `Bearer ${token}`);
				response.cookie('token', token, cookieConfig);

				return user;
			}),
		);
	}
}
