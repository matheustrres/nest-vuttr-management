import { BaseEntity } from './base.entity';
import { GetProps } from './helpers/types';

export class Tool extends BaseEntity {
	public description: string;
	public link: string;
	public title: string;
	public tags: string[];

	constructor(props: GetProps<Tool>) {
		super(props);

		this.title = props.title;
		this.link = props.link;
		this.description = props.description;
		this.tags = props.tags;
	}
}
