import { BaseViewModel } from './base.view-model';

import { Tool } from '@domain/entities/tool.entity';

export type ToolVMResponse = {
	id: string;
	title: string;
	description: string;
	link: string;
	tags: string[];
	createdAt: Date;
};

export class ToolViewModel implements BaseViewModel {
	public static toHTTP(model: Tool): ToolVMResponse {
		return {
			id: model.id,
			title: model.title,
			description: model.description,
			link: model.link,
			tags: model.tags,
			createdAt: model.createdAt,
		};
	}
}
