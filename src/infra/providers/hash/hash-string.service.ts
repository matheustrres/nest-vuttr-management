import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

import { HashString } from '@data/contracts/hash';

@Injectable()
export class HashStringService implements HashString {
	public async hashString(data: string): Promise<string> {
		const salt = await genSalt();

		return hash(data, salt);
	}
}
