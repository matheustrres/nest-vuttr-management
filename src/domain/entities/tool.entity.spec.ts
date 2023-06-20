import { Tool } from './tool.entity';

describe('Tool entity', (): void => {
	it('should create a new Tool', (): void => {
		const tool = new Tool({
			id: 'random_tool_id',
			title: 'Hotel',
			link: 'https://github.com/typicode/hotel',
			description:
				'A simple process manager for developers. Start apps from your browser and access them using local domains',
			tags: [
				'node',
				'organizing',
				'webapps',
				'domain',
				'developer',
				'https',
				'proxy',
			],
		});

		expect(tool.id).toBeDefined();
		expect(tool.id).toBe('random_tool_id');
		expect(tool.link).toBe('https://github.com/typicode/hotel');
		expect(tool.tags.length).toBe(7);
	});
});
