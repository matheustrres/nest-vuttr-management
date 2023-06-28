import { TypeORMToolEntity } from '../entities/tool.entity';
import { TypeORMBaseMapper } from './base.mapper';
import { TypeORMUserMapper } from './user.mapper';

import { Tool } from '@domain/entities/tool.entity';

export class TypeORMToolMapper implements TypeORMBaseMapper {
	private constructor() {
		throw new Error(
			'TypeORMToolMapper is a static class and should not be instantiated.',
		);
	}

	public static toDomain(
		persistence: TypeORMToolEntity,
		relations?: {
			user?: boolean;
		},
	): Tool {
		const { user, ...rest } = persistence;

		const tool = new Tool(rest);

		if (user && relations?.user) {
			tool.user = TypeORMUserMapper.toDomain(user);
		}

		return tool;
	}

	public static toPersistence(
		domain: Tool,
		relations?: {
			user?: boolean;
		},
	): TypeORMToolEntity {
		const { user, ...rest } = domain;

		const mapped = rest as TypeORMToolEntity;

		if (user && relations?.user) {
			mapped.user = TypeORMUserMapper.toPersistence(user);
		}

		return mapped;
	}
}
