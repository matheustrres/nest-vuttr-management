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

	public async delete(
		input: DeleteToolRepository.Input,
	): Promise<DeleteToolRepository.Output> {
		await this.repository.delete({
			id: input.id,
			userId: input.userId,
		});
	}

	public async findById(
		input: FindToolByIdRepository.Input,
	): Promise<FindToolByIdRepository.Output> {
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
		input: FindToolByLinkRepository.Input,
	): Promise<FindToolByLinkRepository.Output> {
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
		input: FindToolByTitleRepository.Input,
	): Promise<FindToolByTitleRepository.Output> {
		const tool = await this.repository.findOne({
			where: {
				title: input.title,
				userId: input.userId,
			},
		});

		if (!tool) return null;

		return TypeORMToolMapper.toDomain(tool);
	}

	public async listTools(
		input: ListToolsRepository.Input,
	): Promise<ListToolsRepository.Output> {
		const tools = await this.repository.find({
			where: {
				userId: input.userId,
				...(input.tag && {
					tags: ArrayContains([input.tag]),
				}),
			},
			skip: input.skip,
			take: input.take,
		});

		return tools.map((t) => TypeORMToolMapper.toDomain(t));
	}
}
