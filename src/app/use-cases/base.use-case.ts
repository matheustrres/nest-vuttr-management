export abstract class BaseUseCase {
	protected abstract getCacheKey(...args: any[]): string;
}
