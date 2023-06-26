import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { CompareStrings } from '@data/contracts/hash';

@Injectable()
export class CompareStringsService implements CompareStrings {
	public async compareStrings(input: {
		plainText: string;
		hash: string;
	}): Promise<boolean> {
		return compare(input.plainText, input.hash);
	}
}
