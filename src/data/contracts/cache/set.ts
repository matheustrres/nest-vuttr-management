export abstract class SetCacheKey {
	public abstract set: <T>(key: string, value: T) => Promise<void>;
}
