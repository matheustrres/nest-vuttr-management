import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tools')
export class TypeORMToolEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

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

	@Column('varchar', {
		length: 255,
		nullable: false,
	})
	title: string;

	@Column('text', {
		array: true,
		nullable: false,
	})
	tags: string[];

	@CreateDateColumn()
	createdAt: Date;
}
