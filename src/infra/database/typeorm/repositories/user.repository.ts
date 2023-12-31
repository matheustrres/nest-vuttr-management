import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { dataSource } from '../datasource';
import { TypeORMUserEntity } from '../entities/user.entity';
import { TypeORMUserMapper } from '../mappers/user.mapper';

import {
	CreateUserRepository,
	FindUserByEmailRepository,
} from '@data/contracts/repositories/user';

import { User } from '@domain/entities/user.entity';

type UserRepository = CreateUserRepository & FindUserByEmailRepository;

@Injectable()
export class TypeORMUserRepository implements UserRepository {
	private repository: Repository<TypeORMUserEntity>;

	constructor() {
		this.repository = dataSource.getRepository(TypeORMUserEntity);
	}

	public async create(user: User): Promise<void> {
		await this.repository.save(user);
	}

	public async findByEmail(email: string): Promise<User | null> {
		const user = await this.repository.findOne({
			where: {
				email,
			},
			relations: {
				tools: true,
			},
		});

		if (!user) return null;

		return TypeORMUserMapper.toDomain(user);
	}
}
