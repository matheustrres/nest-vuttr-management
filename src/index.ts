import { dataSource } from 'infra/database/typeorm/datasource';

console.log('Hello World!');

(async (): Promise<void> => {
	await dataSource.initialize();

	console.log(dataSource.isInitialized);
})();
