/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    // Handle absolute import and module path alias,
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
    '^hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^styling/(.*)$': '<rootDir>/src/styling/$1',
    '^test-utils/(.*)$': '<rootDir>/src/test-utils/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  runner: 'groups',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
