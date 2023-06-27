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
	public static toHTTP(model: User): UserVMResponse {
		return {
			id: model.id,
			name: model.name,
			email: model.email,
			tools: model.tools?.map(ToolViewModel.toHTTP),
			createdAt: model.createdAt,
		};
	}
}
