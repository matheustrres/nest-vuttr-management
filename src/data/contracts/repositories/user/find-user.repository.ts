import { User } from '@domain/entities/user.entity';

type FindUserOutput = User | null;

export abstract class FindUserByEmailRepository {
	public abstract findByEmail: (email: string) => Promise<FindUserOutput>;
}
