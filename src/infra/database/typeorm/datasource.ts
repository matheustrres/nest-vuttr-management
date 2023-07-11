import path from 'node:path';

import { DataSource } from 'typeorm';

import { envConfig } from '@config/env.config';

export const dataSource = new DataSource({
	type: 'postgres',
	port: 5432,
	host: envConfig.db.host,
	database: envConfig.db.name,
	username: envConfig.db.username,
	password: envConfig.db.password,
	entities: [path.join(__dirname, '..', 'typeorm/entities', '*.{ts,js}')],
	migrations: [path.join(__dirname, '..', 'typeorm/migrations', '*.{ts,js}')],
	synchronize: false,
	logging: true,
});
