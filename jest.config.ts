const config = {
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    clearMocks: true,

    collectCoverage: false,

    coverageDirectory: 'coverage',

    coverageProvider: 'v8',

    moduleFileExtensions: [
        'js',
        'mjs',
        'cjs',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
    ],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    modulePaths: ['<rootDir>'],
    testEnvironment: 'node',

    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsconfig: process.cwd() + '/tsconfig.json',
        },
    },
};

export default config;
