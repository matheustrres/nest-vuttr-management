export abstract class GetCacheKey {
	public abstract get: <T>(key: string) => Promise<T | undefined>;
}
