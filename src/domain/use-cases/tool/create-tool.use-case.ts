import { Tool } from '@domain/entities/tool.entity';

export type ICreateToolRequest = {
	title: string;
	link: string;
	description: string;
	tags: string[];
};

export type ICreateToolResponse = {
	tool: Tool;
};

export interface ICreateToolUseCase {
	exec: (request: ICreateToolRequest) => Promise<ICreateToolResponse>;
}
