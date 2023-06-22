import { Tool } from '@domain/entities/tool.entity';

export abstract class CreateToolRepository {
	public abstract create: (tool: Tool) => Promise<void>;
}
