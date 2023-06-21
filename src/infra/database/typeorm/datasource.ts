import path from 'node:path';

import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
	type: 'postgres',
	port: Number(process.env.PG_PORT) || 5432,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	username: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
	entities: [path.join(__dirname, '..', 'typeorm/entities', '*.{ts,js}')],
	migrations: [path.join(__dirname, '..', 'typeorm/migrations', '*.{ts,js}')],
	synchronize: false,
	ssl: process.env.NODE_ENV !== 'development',
	logging: true,
});
