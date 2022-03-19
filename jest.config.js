/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(png|svg|pdf|jpg|jpeg)$': '<rootDir>/jest/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
    // Handle absolute import and module path alias
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/__tests__/fixtures/',
  ],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['\\.css$', '\\.png$'],
};
