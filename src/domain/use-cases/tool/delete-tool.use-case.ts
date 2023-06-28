export type DeleteToolRequest = {
	id: string;
	userId: string;
};

export type DeleteToolResponse = void;

export interface IDeleteToolUseCase {
	exec: (request: DeleteToolRequest) => Promise<DeleteToolResponse>;
}
