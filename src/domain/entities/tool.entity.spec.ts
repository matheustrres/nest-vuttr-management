import { Tool } from './tool.entity';

import { makeUser } from '@tests/factories/entities/user.factory';

describe('Tool [entity]', (): void => {
	it('should create a new Tool', (): void => {
		const user = makeUser();

		const tool = new Tool({
			id: 'random_tool_id',
			title: 'Hotel',
			description:
				'A simple process manager for developers. Start apps from your browser and access them using local domains',
			link: 'https://github.com/typicode/hotel',
			tags: [
				'node',
				'organizing',
				'webapps',
				'domain',
				'developer',
				'https',
				'proxy',
			],
			userId: user.id,
		});

		expect(tool.id).toBeDefined();
		expect(tool.id).toBe('random_tool_id');
		expect(tool.title).toBe('Hotel');
		expect(tool.link).toBe('https://github.com/typicode/hotel');
		expect(tool.tags.length).toBe(7);
		expect(tool.userId).toEqual(user.id);
	});
});
