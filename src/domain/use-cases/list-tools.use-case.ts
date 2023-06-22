import { Tool } from '@domain/entities/tool.entity';

export type IListToolsRequest = {
	tag?: string | null;
};

export type IListToolsResponse = {
	tools: Tool[];
};

export interface IListToolsUseCase {
	exec: (request?: IListToolsRequest) => Promise<IListToolsResponse>;
}
