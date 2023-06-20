import { Tool } from '@domain/entities/tool.entity';

export type IListToolsResponse = {
	tools: Tool[];
};

export interface IListToolsUseCase {
	exec: () => Promise<IListToolsResponse>;
}
