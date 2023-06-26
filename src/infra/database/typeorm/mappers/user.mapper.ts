import { TypeORMUserEntity } from '../entities/user.entity';
import { TypeORMBaseMapper } from './base.mapper';

import { User } from '@domain/entities/user.entity';

export class TypeORMUserMapper
	implements TypeORMBaseMapper<User, TypeORMUserEntity>
{
	public toDomain(persistence: TypeORMUserEntity): User {
		return new User({
			id: persistence.id,
			name: persistence.name,
			email: persistence.email,
			password: persistence.password,
			createdAt: persistence.createdAt,
		});
	}
}
