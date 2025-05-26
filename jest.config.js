module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  testPathIgnorePatterns: ['/node_modules/'],
  testTimeout: 10000,
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.js'
  ],
  // Only use setup files for integration and e2e tests
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
      setupFilesAfterEnv: []
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/**/*.(integration|e2e).test.js'],
      setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
    }
  ]
};
