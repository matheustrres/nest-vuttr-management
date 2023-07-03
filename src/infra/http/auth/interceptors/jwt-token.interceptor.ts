import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

import { cookieConfig } from '@config/cookie.config';

import { User } from '@domain/entities/user.entity';

@Injectable()
export class JWTTokenInterceptor implements NestInterceptor {
	constructor(private readonly jwtService: JwtService) {}

	public intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> {
		return next.handle().pipe(
			map((user: User): User => {
				const token = this.jwtService.sign({
					sub: user.email,
				}) as string;
				const response = context.switchToHttp().getResponse() as Response;

				response.setHeader('Authorization', `Bearer ${token}`);
				response.cookie('token', token, cookieConfig);

				return user;
			}),
		);
	}
}
