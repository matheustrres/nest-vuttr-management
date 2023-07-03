import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

import { ServerError } from '@domain/errors/server.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	public catch(exception: any, host: ArgumentsHost): Response {
		const ctx: HttpArgumentsHost = host.switchToHttp();

		const response = ctx.getResponse() as Response;
		const request = ctx.getRequest() as Request;

		if (exception instanceof ServerError) {
			const { message, statusCode: code } = exception;

			return response.status(code).json({
				message,
				code,
				timestamp: new Date().toISOString(),
				endpoint: request.path,
			});
		}

		if (exception instanceof HttpException) {
			const code = exception.getStatus();

			return response.status(code).json({
				message: exception.message,
				code,
				timestamp: new Date().toISOString(),
				endpoint: request.path,
			});
		}

		return response.status(500).json({
			message: 'Internal Server Error',
			code: 500,
			timestamp: new Date().toISOString(),
			endpoint: request.path,
		});
	}
}
