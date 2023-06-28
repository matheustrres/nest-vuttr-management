import { BaseEntity } from './base.entity';
import { GetProps } from './helpers/types';
import { User } from './user.entity';

export class Tool extends BaseEntity {
	public title: string;
	public description: string;
	public link: string;
	public tags: string[];
	public userId: string;
	public user?: User;

	constructor(props: GetProps<Tool>) {
		super(props);

		this.title = props.title;
		this.description = props.description;
		this.link = props.link;
		this.tags = props.tags;
		this.userId = props.userId;
		this.user = props.user;
	}
}
