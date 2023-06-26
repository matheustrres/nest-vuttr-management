import { ServerError } from '../server.error';

export class UserAuthenticationError extends ServerError {
	constructor(message: string, statusCode = 400) {
		super(message, statusCode);
	}
}
