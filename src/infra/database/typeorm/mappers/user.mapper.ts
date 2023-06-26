import { TypeORMUserEntity } from '../entities/user.entity';
import { TypeORMBaseMapper } from './base.mapper';

import { User } from '@domain/entities/user.entity';

export class TypeORMUserMapper implements TypeORMBaseMapper {
	private constructor() {
		throw new Error(
			'TypeORMUserMapper is a static class and should not be instantiated.',
		);
	}

	public static toDomain(persistence: TypeORMUserEntity): User {
		return new User({
			id: persistence.id,
			name: persistence.name,
			email: persistence.email,
			password: persistence.password,
			createdAt: persistence.createdAt,
		});
	}
}
