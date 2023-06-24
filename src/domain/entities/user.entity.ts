import { BaseEntity } from './base.entity';
import { GetProps } from './helpers/types';
import { Tool } from './tool.entity';

export class User extends BaseEntity {
	public name: string;
	public email: string;
	public password: string;
	public tools?: Tool[];

	constructor(props: GetProps<User>) {
		super(props);

		this.name = props.name;
		this.email = props.email;
		this.password = props.password;
		this.tools = props.tools;
	}
}
