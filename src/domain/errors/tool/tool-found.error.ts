import { ServerError } from '../server.error';

export class ToolFoundError extends ServerError {
	constructor(message: string, statusCode = 400) {
		super(message, statusCode);
	}
}
