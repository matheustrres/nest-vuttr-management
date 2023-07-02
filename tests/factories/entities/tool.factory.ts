import { makeUser } from './user.factory';

import { GetProps } from '@domain/entities/helpers/types';
import { Tool } from '@domain/entities/tool.entity';

export const makeTool = (props: Partial<GetProps<Tool>> = {}): Tool => {
	const user = makeUser();

	return new Tool({
		title: 'Random Tool Title',
		description: 'Random Tool Description',
		link: 'Random Tool Link',
		tags: ['web', 'http', 'http2', 'community'],
		userId: user.id,
		...props,
	});
};
