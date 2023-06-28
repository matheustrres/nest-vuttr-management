import { Tool } from '@domain/entities/tool.entity';

type FindToolBaseInput = {
	userId: string;
};
type FindToolBaseOutput = Tool | null;

export namespace FindToolByIdRepository {
	export type Input = FindToolBaseInput & {
		id: string;
	};
	export type Output = FindToolBaseOutput;
}

export namespace FindToolByLinkRepository {
	export type Input = FindToolBaseInput & {
		link: string;
	};
	export type Output = FindToolBaseOutput;
}

export namespace FindToolByTitleRepository {
	export type Input = FindToolBaseInput & {
		title: string;
	};
	export type Output = FindToolBaseOutput;
}

export abstract class FindToolByIdRepository {
	public abstract findById: (
		input: FindToolByIdRepository.Input,
	) => Promise<FindToolByIdRepository.Output>;
}

export abstract class FindToolByLinkRepository {
	public abstract findByLink: (
		input: FindToolByLinkRepository.Input,
	) => Promise<FindToolByLinkRepository.Output>;
}

export abstract class FindToolByTitleRepository {
	public abstract findByTitle: (
		input: FindToolByTitleRepository.Input,
	) => Promise<FindToolByTitleRepository.Output>;
}
