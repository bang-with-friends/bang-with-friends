module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      packageJson: 'package.json',
    },
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
  ],
};
