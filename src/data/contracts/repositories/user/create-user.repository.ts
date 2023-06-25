import { User } from '@domain/entities/user.entity';

export abstract class CreateUserRepository {
	public abstract create: (user: User) => Promise<void>;
}
