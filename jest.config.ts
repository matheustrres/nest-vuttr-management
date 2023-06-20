import { Config } from 'jest';

const config: Config = {
	roots: ['<rootDir>/src'],
	moduleFileExtensions: ['js', 'json', 'ts'],
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
	moduleNameMapper: {
		'@tests/(.+)': '<rootDir>/tests/$1',
		'@app/(.+)': '<rootDir>/src/app/$1',
		'@data/(.+)': '<rootDir>/src/data/$1',
		'@domain/(.+)': '<rootDir>/src/domain/$1',
	},
};

export default config;
