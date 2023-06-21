import { Tool } from '@domain/entities/tool.entity';

type FindByToolOutput = Tool | undefined;

export abstract class FindToolByIdRepository {
	public abstract findById: (id: string) => Promise<FindByToolOutput>;
}

export abstract class FindToolByLinkRepository {
	public abstract findByLink: (link: string) => Promise<FindByToolOutput>;
}

export abstract class FindToolByTitleRepository {
	public abstract findByTitle: (title: string) => Promise<FindByToolOutput>;
}
