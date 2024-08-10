module.exports = {
    testEnvironment: "node",
    coverrageDirectory: 'coverage',
    testMatch: ['**/test/**/.test.js'],
    collectCoverageFrom: ['src/**/*.js'],
    setupFilesAfterEnv: ['/jest.setup.js']
}

// jest.setup.js
// jest.setTimeout(90000)