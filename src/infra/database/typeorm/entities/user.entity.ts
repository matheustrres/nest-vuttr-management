import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { TypeORMToolEntity } from './tool.entity';

@Entity('users')
export class TypeORMUserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 255,
		nullable: false,
	})
	name: string;

	@Column('varchar', {
		length: 255,
		nullable: false,
	})
	email: string;

	@Column('varchar', {
		length: 255,
		nullable: false,
	})
	password: string;

	@OneToMany(() => TypeORMToolEntity, (tool) => tool.user)
	tools: TypeORMToolEntity[];

	@CreateDateColumn()
	createdAt: Date;
}
