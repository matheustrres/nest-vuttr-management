import { Tool } from '@domain/entities/tool.entity';

type ListToolsRepositoryInput = {
	tag?: string | null;
};

export interface ListToolsRepository {
	listTools: (input?: ListToolsRepositoryInput) => Promise<Tool[]>;
}
