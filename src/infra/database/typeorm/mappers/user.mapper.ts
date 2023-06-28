import { TypeORMUserEntity } from '../entities/user.entity';
import { TypeORMBaseMapper } from './base.mapper';
import { TypeORMToolMapper } from './tool.mapper';

import { User } from '@domain/entities/user.entity';

export class TypeORMUserMapper implements TypeORMBaseMapper {
	private constructor() {
		throw new Error(
			'TypeORMUserMapper is a static class and should not be instantiated.',
		);
	}

	public static toDomain(persistence: TypeORMUserEntity): User {
		return new User({
			...persistence,
			tools: persistence.tools.map((t) => TypeORMToolMapper.toDomain(t)),
		});
	}

	public static toPersistence(
		domain: User,
		relations?: {
			tools?: boolean;
		},
	): TypeORMUserEntity {
		const { tools, ...rest } = domain;

		const user = rest as TypeORMUserEntity;

		if (tools && relations?.tools) {
			user.tools = tools.map((t) => TypeORMToolMapper.toPersistence(t));
		}

		return user;
	}
}
