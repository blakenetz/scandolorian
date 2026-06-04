import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: [
    '<rootDir>/packages/testing/jest.setup.ts',
  ],

  moduleNameMapper: {
    '^@scandalorian/ui(.*)$': '<rootDir>/packages/components-library/src$1',
    '^@scandalorian/testing(.*)$':
      '<rootDir>/packages/testing/src$1',
  },

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
};

export default config;