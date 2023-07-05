import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import {
	DeleteCacheKey,
	GetCacheKey,
	SetCacheKey,
} from '@data/contracts/cache';

type CacheServiceContract = DeleteCacheKey & GetCacheKey & SetCacheKey;

@Injectable()
export class CacheService implements CacheServiceContract {
	constructor(
		@Inject(CACHE_MANAGER)
		private readonly cacheManager: Cache,
	) {}

	public async del(key: string): Promise<void> {
		await this.cacheManager.del(key);
	}

	public async get<T>(key: string): Promise<T | undefined> {
		const data = await this.cacheManager.get<T>(key);

		return data ? (data as T) : undefined;
	}

	public async set<T>(key: string, value: T): Promise<void> {
		const TWELVE_HOURS_IN_MS = 43_200_000;

		await this.cacheManager.set(key, value, TWELVE_HOURS_IN_MS);
	}
}
