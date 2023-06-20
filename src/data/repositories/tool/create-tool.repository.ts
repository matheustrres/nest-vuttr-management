import { Tool } from '@domain/entities/tool.entity';

export interface CreateToolRepository {
	create: (tool: Tool) => Promise<void>;
}
