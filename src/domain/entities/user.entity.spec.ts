import { User } from './user.entity';

import { makeTool } from '@tests/factories/entities/tool.factory';

describe('User [entity]', (): void => {
	it('should create a new User', (): void => {
		const user = new User({
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			password: 'youshallnotpass',
			tools: [makeTool(), makeTool(), makeTool()],
		});

		expect(user.id).toBeDefined();
		expect(user.name).toBe('John Doe');
		expect(user.email).toBe('johndoe@gmail.com');
		expect(user.tools).toBeTruthy();
		expect(user.tools?.length).toBe(3);
	});
});
