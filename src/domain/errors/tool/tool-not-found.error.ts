import { ServerError } from '../server.error';

export class ToolNotFoundError extends ServerError {
	constructor(message: string, statusCode = 400) {
		super(message, statusCode);
	}
}
