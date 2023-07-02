import { Tool } from '@domain/entities/tool.entity';

export namespace ListToolsRepository {
	export type Input = {
		userId: string;
		tag?: string | null;
		skip?: number;
		take?: number;
	};
	export type Output = Tool[];
}

export abstract class ListToolsRepository {
	public abstract listTools: (
		input: ListToolsRepository.Input,
	) => Promise<Tool[]>;
}
