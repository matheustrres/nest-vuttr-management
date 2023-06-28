import { BaseEntity } from '@domain/entities/base.entity';

export abstract class TypeORMBaseMapper {
	public static toDomain: <TDomain extends BaseEntity, TPersistence>(
		persistence: TPersistence,
		relations?: {
			[relation: string]: boolean;
		},
	) => TDomain;
	public static toPersistence: <TPersistence, TDomain extends BaseEntity>(
		domain: TDomain,
		relations?:
			| {
					[relation: string]: boolean;
			  }
			| never,
	) => TPersistence;
}
