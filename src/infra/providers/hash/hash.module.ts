import { Module } from '@nestjs/common';

import { CompareStringsService } from './compare-strings.service';
import { HashStringService } from './hash-string.service';

import { CompareStrings, HashString } from '@data/contracts/hash';

@Module({
	providers: [
		{
			provide: CompareStrings,
			useClass: CompareStringsService,
		},
		{
			provide: HashString,
			useClass: HashStringService,
		},
	],
	exports: [HashString, CompareStrings],
})
export class HashModule {}
