import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { DatabaseService } from './database.service';
import { dataSource } from './typeorm/datasource';
import { TypeORMToolRepository } from './typeorm/repositories/tool.repository';
import { TypeORMUserRepository } from './typeorm/repositories/user.repository';

// tool repositories
import {
	CreateToolRepository,
	DeleteToolRepository,
	FindToolByIdRepository,
	FindToolByLinkRepository,
	FindToolByTitleRepository,
	ListToolsRepository,
} from '@data/contracts/repositories/tool';
// user repositories
import {
	CreateUserRepository,
	FindUserByEmailRepository,
} from '@data/contracts/repositories/user';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: DatabaseService,
			dataSourceFactory: async (
				options?: DataSourceOptions,
			): Promise<DataSource> => {
				if (!options) {
					throw new Error('No DataSource options were provided!');
				}

				return dataSource.initialize();
			},
		}),
	],
	providers: [
		// tool-related
		{
			provide: CreateToolRepository,
			useClass: TypeORMToolRepository,
		},
		{
			provide: DeleteToolRepository,
			useClass: TypeORMToolRepository,
		},
		{
			provide: FindToolByIdRepository,
			useClass: TypeORMToolRepository,
		},
		{
			provide: FindToolByLinkRepository,
			useClass: TypeORMToolRepository,
		},
		{
			provide: FindToolByTitleRepository,
			useClass: TypeORMToolRepository,
		},
		{
			provide: ListToolsRepository,
			useClass: TypeORMToolRepository,
		},
		// user-related
		{
			provide: CreateUserRepository,
			useClass: TypeORMUserRepository,
		},
		{
			provide: FindUserByEmailRepository,
			useClass: TypeORMUserRepository,
		},
	],
	exports: [
		// tool-related
		CreateToolRepository,
		DeleteToolRepository,
		FindToolByIdRepository,
		FindToolByLinkRepository,
		FindToolByTitleRepository,
		ListToolsRepository,
		// user-related
		CreateUserRepository,
		FindUserByEmailRepository,
	],
})
export class DatabaseModule {}
