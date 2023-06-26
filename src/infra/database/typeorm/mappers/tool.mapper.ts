import { TypeORMToolEntity } from '../entities/tool.entity';
import { TypeORMBaseMapper } from './base.mapper';

import { Tool } from '@domain/entities/tool.entity';

export class TypeORMToolMapper implements TypeORMBaseMapper {
	private constructor() {
		throw new Error(
			'TypeORMToolMapper is a static class and should not be instantiated.',
		);
	}

	public static toDomain(persistence: TypeORMToolEntity): Tool {
		return new Tool({
			id: persistence.id,
			title: persistence.title,
			description: persistence.description,
			link: persistence.link,
			tags: persistence.tags,
			userId: persistence.userId,
			createdAt: persistence.createdAt,
		});
	}
}
