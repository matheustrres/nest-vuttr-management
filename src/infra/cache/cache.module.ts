import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { CacheService } from './cache.service';

import {
	DeleteCacheKey,
	GetCacheKey,
	SetCacheKey,
} from '@data/contracts/cache';

const TWELVE_HOURS_IN_MS = 43_200_000;

@Module({
	imports: [
		CacheModule.register({
			isGlobal: true,
			ttl: TWELVE_HOURS_IN_MS,
		}),
	],
	providers: [
		{
			provide: DeleteCacheKey,
			useClass: CacheService,
		},
		{
			provide: GetCacheKey,
			useExisting: DeleteCacheKey,
		},
		{
			provide: SetCacheKey,
			useExisting: DeleteCacheKey,
		},
	],
	exports: [DeleteCacheKey, GetCacheKey, SetCacheKey],
})
export class VUTTRCacheModule {}
