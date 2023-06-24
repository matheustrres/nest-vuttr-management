import { BaseEntity } from './base.entity';
import { GetProps } from './helpers/types';

export class Tool extends BaseEntity {
	public title: string;
	public description: string;
	public link: string;
	public tags: string[];
	public userId: string;

	constructor(props: GetProps<Tool>) {
		super(props);

		this.title = props.title;
		this.description = props.description;
		this.link = props.link;
		this.tags = props.tags;
		this.userId = props.userId;
	}
}
