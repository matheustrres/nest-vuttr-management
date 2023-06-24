import { makeUser } from './user.factory';

import { GetProps } from '@domain/entities/helpers/types';
import { Tool } from '@domain/entities/tool.entity';

export const makeTool = (props: Partial<GetProps<Tool>> = {}): Tool => {
	const user = makeUser();

	return new Tool({
		title: 'Github',
		description:
			'Where over 100 million developers shape the future of software, together. Contribute to the open source community, manage your Git repositories...',
		link: 'https://github.com/',
		tags: ['github', 'coding', 'developers', 'open-source', 'community'],
		userId: user.id,
		...props,
	});
};
