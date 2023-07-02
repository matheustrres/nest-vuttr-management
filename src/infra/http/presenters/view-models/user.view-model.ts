import { BaseViewModel } from './base.view-model';
import { ToolVMResponse, ToolViewModel } from './tool.view-model';

import { User } from '@domain/entities/user.entity';

export type UserVMResponse = {
	id: string;
	name: string;
	email: string;
	tools?: ToolVMResponse[];
	createdAt: Date;
};

export class UserViewModel implements BaseViewModel {
	public static toHTTP(model: User, loadTools = false): UserVMResponse {
		const common = {
			id: model.id,
			name: model.name,
			email: model.email,
			createdAt: model.createdAt,
		};

		if (model.tools?.length && loadTools) {
			return {
				...common,
				tools: model.tools.map(ToolViewModel.toHTTP),
			};
		}

		return common;
	}
}
