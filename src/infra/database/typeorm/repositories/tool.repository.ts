import { Injectable } from '@nestjs/common';
import { Repository, ArrayContains } from 'typeorm';

import { dataSource } from '../datasource';
import { TypeORMToolEntity } from '../entities/tool.entity';
import { TypeORMToolMapper } from '../mappers/tool.mapper';

import {
	CreateToolRepository,
	DeleteToolRepository,
	FindToolByIdRepository,
	FindToolByLinkRepository,
	FindToolByTitleRepository,
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

	public async delete(id: string): Promise<void> {
		await this.repository.delete(id);
	}

	public async findById(id: string): Promise<Tool | null> {
		const tool = await this.repository.findOne({
			where: {
				id,
			},
		});

		if (!tool) return null;

		return TypeORMToolMapper.toDomain(tool);
	}

	public async findByLink(link: string): Promise<Tool | null> {
		const tool = await this.repository.findOne({
			where: {
				link,
			},
		});

		if (!tool) return null;

		return TypeORMToolMapper.toDomain(tool);
	}

	public async findByTitle(title: string): Promise<Tool | null> {
		const tool = await this.repository.findOne({
			where: {
				title,
			},
		});

		if (!tool) return null;

		return TypeORMToolMapper.toDomain(tool);
	}

	public async listTools(
		input?: { tag?: string | null } | undefined,
	): Promise<Tool[]> {
		const tools = await this.repository.find({
			...(input?.tag && {
				where: {
					tags: ArrayContains([input.tag]),
				},
			}),
		});

		return tools.map(TypeORMToolMapper.toDomain);
	}
}
