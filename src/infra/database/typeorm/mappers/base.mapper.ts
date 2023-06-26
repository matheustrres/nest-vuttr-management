export interface TypeORMBaseMapper<TDomain, TPersistence> {
	toDomain: (persistence: TPersistence) => TDomain;
}
