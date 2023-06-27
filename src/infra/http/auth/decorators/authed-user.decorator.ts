import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

import { User } from '@domain/entities/user.entity';

export const AuthedUser = createParamDecorator(
	(_: any, ctx: ExecutionContext): User => {
		const request = ctx.switchToHttp().getRequest() as Request;
		const user = request.user as User;

		return user;
	},
);
