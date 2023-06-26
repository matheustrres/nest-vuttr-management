import { BaseEntity } from '@domain/entities/base.entity';

export abstract class TypeORMBaseMapper {
	public static toDomain: <TDomain extends BaseEntity, TPersistence>(
		persistence: TPersistence,
	) => TDomain;
}
