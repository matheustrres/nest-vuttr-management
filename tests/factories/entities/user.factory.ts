import { GetProps } from '@domain/entities/helpers/types';
import { User } from '@domain/entities/user.entity';

export const makeUser = (props: Partial<GetProps<User>> = {}): User => {
	return new User({
		id: 'random_user_id',
		name: 'John Doe',
		email: 'johndoe@gmail.com',
		password: 'youshallnotpass',
		tools: [],
		...props,
	});
};
