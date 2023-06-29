import { Tool } from '@domain/entities/tool.entity';

export type IFindToolByIdRequest = {
	id: string;
	userId: string;
};

export type IFindToolByIdResponse = {
	tool: Tool;
};

export interface IFindToolByIdUseCase {
	exec: (request: IFindToolByIdRequest) => Promise<IFindToolByIdResponse>;
}
