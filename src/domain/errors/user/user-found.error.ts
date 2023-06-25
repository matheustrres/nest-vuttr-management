import { ServerError } from '../server.error';

export class UserFoundError extends ServerError {
	constructor(message: string, statusCode = 400) {
		super(message, statusCode);
	}
}
