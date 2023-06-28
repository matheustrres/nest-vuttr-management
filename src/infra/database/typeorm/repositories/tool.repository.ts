import { Injectable } from '@nestjs/common';
import { Repository, ArrayContains } from 'typeorm';

import { dataSource } from '../datasource';
import { TypeORMToolEntity } from '../entities/tool.entity';
import { TypeORMToolMapper } from '../mappers/tool.mapper';

import {
	CreateToolRepository,
	DeleteToolRepository,
	DeleteToolRepositoryInput,
	FindToolByIdRepository,
	FindToolByIdRepositoryInput,
	FindToolByLinkRepository,
	FindToolByLinkRepositoryInput,
	FindToolByTitleRepository,
	FindToolByTitleRepositoryInput,
	ListToolsRepository,
} from '@data/contracts/repositories/tool';

import { Tool } from '@domain/entities/tool.entity';

type ToolRepository = CreateToolRepository &
	DeleteToolRepository &
	FindToolByIdRepository &
	FindToolByLinkRepository &
	FindToolByTitleRepository &
	ListToolsRepository;

@Injectable()
export class TypeORMToolRepository implements ToolRepository {
	private repository: Repository<TypeORMToolEntity>;

	constructor() {
		this.repository = dataSource.getRepository(TypeORMToolEntity);
	}

	public async create(tool: Tool): Promise<void> {
		await this.repository.save(tool);
	}

	public async delete(input: DeleteToolRepositoryInput): Promise<void> {
		await this.repository.delete({
			id: input.id,
			userId: input.userId,
		});
	}

	public async findById(
		input: FindToolByIdRepositoryInput,
	): Promise<Tool | null> {
		const tool = await this.repository.findOne({
			where: {
				id: input.id,
				userId: input.userId,
			},
		});

		if (!tool) return null;

		return TypeORMToolMapper.toDomain(tool);
	}

	public async findByLink(
		input: FindToolByLinkRepositoryInput,
	): Promise<Tool | null> {
		const tool = await this.repository.findOne({
			where: {
				link: input.link,
				userId: input.userId,
			},
		});

		if (!tool) return null;

		return TypeORMToolMapper.toDomain(tool);
	}

	public async findByTitle(
		input: FindToolByTitleRepositoryInput,
	): Promise<Tool | null> {
		const tool = await this.repository.findOne({
			where: {
				title: input.title,
				userId: input.userId,
			},
		});

		if (!tool) return null;

		return TypeORMToolMapper.toDomain(tool);
	}

	public async listTools(input: {
		userId: string;
		tag?: string | null;
	}): Promise<Tool[]> {
		const tools = await this.repository.find({
			where: {
				userId: input.userId,
				...(input.tag && {
					tags: ArrayContains([input.tag]),
				}),
			},
		});

		return tools.map(TypeORMToolMapper.toDomain);
	}
}
