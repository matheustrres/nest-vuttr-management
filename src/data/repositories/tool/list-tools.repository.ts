import { Tool } from '@domain/entities/tool.entity';

export interface ListToolsRepository {
	listTools: () => Promise<Tool[]>;
}
