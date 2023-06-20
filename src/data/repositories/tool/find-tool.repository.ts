import { Tool } from '@domain/entities/tool.entity';

type FindByToolOutput = Tool | undefined;

export interface FindToolByTitleRepository {
	findByTitle: (title: string) => Promise<FindByToolOutput>;
}

export interface FindToolByLinkRepository {
	findByLink: (link: string) => Promise<FindByToolOutput>;
}
