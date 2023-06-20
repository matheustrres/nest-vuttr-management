import crypto from 'node:crypto';

import { GetProps } from './helpers/types';

export class BaseEntity {
	public readonly id: string;
	public readonly createdAt: Date;

	constructor(props: GetProps<BaseEntity>) {
		this.id = props.id || crypto.randomUUID();
		this.createdAt = props.createdAt || new Date();
	}
}
