export type GetCacheKeyInput = {
	userId: string;
	toolId: string;
};

export abstract class BaseUseCase {
	protected abstract getCacheKey(...args: any[]): string;
}
