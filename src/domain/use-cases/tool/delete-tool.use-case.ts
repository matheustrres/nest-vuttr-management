export type DeleteToolRequest = {
	id: string;
};

export type DeleteToolResponse = void;

export interface IDeleteToolUseCase {
	exec: (request: DeleteToolRequest) => Promise<DeleteToolResponse>;
}
