import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import { TypeORMUserEntity } from './user.entity';

@Entity('tools')
export class TypeORMToolEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 255,
		nullable: false,
	})
	title: string;

	@Column('varchar', {
		length: 255,
		nullable: false,
	})
	description: string;

	@Column('varchar', {
		length: 255,
		nullable: false,
	})
	link: string;

	@Column('text', {
		array: true,
		nullable: false,
	})
	tags: string[];

	@Column({
		type: 'varchar',
		nullable: false,
	})
	userId: string;

	@ManyToOne(() => TypeORMUserEntity, (user) => user.tools)
	@JoinColumn({ name: 'userId', referencedColumnName: 'id' })
	user: TypeORMUserEntity;

	@CreateDateColumn()
	createdAt: Date;
}
