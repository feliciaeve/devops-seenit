const path = require('path');

module.exports = {
    // preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': [
            'babel-jest',
            { configFile: './babel.config.test.js' },
        ],
    },
    testPathIgnorePatterns: ['/node_modules/', 'babel.config.test.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    testMatch: [
        '**/__tests__/**/*.(test|spec).(ts|tsx|js)',
        '**/?(*.)+(spec|test).(ts|tsx|js)',
    ],
    collectCoverageFrom: [
        'actions/**/*.{ts,tsx}',
        'app/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}',
        '!components/LazyImage.tsx',
        '!components/MovieActorsSection.tsx',
        '!components/MovieCardWatchlistWrapper.tsx',
        '!components/SuccessToast.tsx',
        '!components/layout/ThemeProvider.tsx',
        '!app/layout.tsx',
        '!app/**/page.tsx',
        '!app/global-error.tsx',
        '!app/api/**',
        '!**/node_modules/**',
        '!**/.next/**', 
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^swiper/css$': require.resolve('./__mocks__/styleMock.js'),
    },
    transformIgnorePatterns: [
        'node_modules/(?!(swiper)/)', // hanya transform 'swiper'
    ],
};
