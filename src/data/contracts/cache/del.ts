export abstract class DeleteCacheKey {
	public abstract del: (key: string) => Promise<void>;
}
