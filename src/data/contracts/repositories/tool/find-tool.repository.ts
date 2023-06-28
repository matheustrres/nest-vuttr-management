import { Tool } from '@domain/entities/tool.entity';

type FindToolBaseInput = {
	userId: string;
};

export type FindToolByIdRepositoryInput = FindToolBaseInput & {
	id: string;
};

export type FindToolByLinkRepositoryInput = FindToolBaseInput & {
	link: string;
};

export type FindToolByTitleRepositoryInput = FindToolBaseInput & {
	title: string;
};

type FindByToolOutput = Tool | null;

export abstract class FindToolByIdRepository {
	public abstract findById: (
		input: FindToolByIdRepositoryInput,
	) => Promise<FindByToolOutput>;
}

export abstract class FindToolByLinkRepository {
	public abstract findByLink: (
		input: FindToolByLinkRepositoryInput,
	) => Promise<FindByToolOutput>;
}

export abstract class FindToolByTitleRepository {
	public abstract findByTitle: (
		input: FindToolByTitleRepositoryInput,
	) => Promise<FindByToolOutput>;
}
