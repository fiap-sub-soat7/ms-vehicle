import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const JEST_CONFIG: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  moduleFileExtensions: ['js', 'json', 'ts'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  testTimeout: 60000,
  rootDir: '',
  roots: ['src', 'test'],
  testRegex: '.*\\.(spec|test)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'test/[^/]+.(ts|js)',
    'src/(infrastructure|presentation)',
  ],
  coverageDirectory: '<rootDir>/coverage',
  globalSetup: '<rootDir>/test/setup.ts',
  globalTeardown: '<rootDir>/test/teardown.ts',
  setupFilesAfterEnv: ['<rootDir>/test/run.ts'],
};

export default JEST_CONFIG;
