import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { DatabaseService } from './database.service';
import { dataSource } from './typeorm/datasource';
import { TypeORMToolRepository } from './typeorm/repositories/tool.repository';

import {
	CreateToolRepository,
	DeleteToolRepository,
	FindToolByIdRepository,
	FindToolByLinkRepository,
	FindToolByTitleRepository,
	ListToolsRepository,
} from '@data/contracts/repositories';

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
	],
	exports: [
		CreateToolRepository,
		DeleteToolRepository,
		FindToolByIdRepository,
		FindToolByLinkRepository,
		FindToolByTitleRepository,
		ListToolsRepository,
	],
})
export class DatabaseModule {}
