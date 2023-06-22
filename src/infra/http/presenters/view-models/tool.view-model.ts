import { BaseViewModel } from './base.view-model';

import { TypeORMToolEntity } from '@infra/database/typeorm/entities/tool.entity';

export type ToolVMResponse = {
	id: string;
	title: string;
	description: string;
	link: string;
	tags: string[];
	createdAt: Date;
};

export class ToolViewModel
	implements BaseViewModel<TypeORMToolEntity, ToolVMResponse>
{
	public toHTTP(model: TypeORMToolEntity): ToolVMResponse {
		return {
			id: model.id,
			title: model.title,
			description: model.description,
			link: model.link,
			tags: model.tags,
			createdAt: model.createdAt,
		};
	}

	public mapArrayToHTTP(models: TypeORMToolEntity[]): ToolVMResponse[] {
		return models.map(this.toHTTP);
	}
}
