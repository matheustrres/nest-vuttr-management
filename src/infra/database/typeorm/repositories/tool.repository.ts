import { Injectable } from '@nestjs/common';
import { Repository, ArrayContains } from 'typeorm';

import { dataSource } from '../datasource';
import { TypeORMToolEntity } from '../entities/tool.entity';

import {
	CreateToolRepository,
	DeleteToolRepository,
	FindToolByIdRepository,
	FindToolByLinkRepository,
	FindToolByTitleRepository,
	ListToolsRepository,
} from '@data/repositories';

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
		return this.repository.findOne({
			where: {
				id,
			},
		});
	}

	public async findByLink(link: string): Promise<Tool | null> {
		return this.repository.findOne({
			where: {
				link,
			},
		});
	}

	public async findByTitle(title: string): Promise<Tool | null> {
		return this.repository.findOne({
			where: {
				title,
			},
		});
	}

	public async listTools(
		input?: { tag?: string | null } | undefined,
	): Promise<Tool[]> {
		return this.repository.find({
			...(input?.tag && {
				where: {
					tags: ArrayContains([input.tag]),
				},
			}),
		});
	}
}
