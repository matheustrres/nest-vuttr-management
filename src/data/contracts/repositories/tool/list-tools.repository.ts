import { Tool } from '@domain/entities/tool.entity';

type ListToolsRepositoryInput = {
	userId: string;
	tag?: string | null;
};

export abstract class ListToolsRepository {
	public abstract listTools: (
		input: ListToolsRepositoryInput,
	) => Promise<Tool[]>;
}
