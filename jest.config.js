module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@react-native-community/.*|@react-navigation/.*|@unimodules/.*|@expo/.*|expo-.*)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { 
          targets: { node: 'current' },
          modules: 'commonjs'
        }],
        '@babel/preset-react',
        '@babel/preset-typescript'
      ],
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-export-namespace-from',
        ['@babel/plugin-transform-class-properties', { loose: false }],
        ['@babel/plugin-transform-private-methods', { loose: false }],
        ['@babel/plugin-transform-private-property-in-object', { loose: false }]
      ]
    }]
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^expo-2d-context$': '<rootDir>/__mocks__/expo-2d-context.js',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^react-native$': '<rootDir>/node_modules/react-native',
    '^react-native-web$': '<rootDir>/node_modules/react-native-web',
    '^react-native/Libraries/Components/(.*)$': '<rootDir>/node_modules/react-native/Libraries/Components/$1',
    '^react-native/Libraries/Modal/(.*)$': '<rootDir>/node_modules/react-native/Libraries/Modal/$1',
    '^react-native/Libraries/Components/SafeAreaView/(.*)$': '<rootDir>/node_modules/react-native/Libraries/Components/SafeAreaView/$1',
    '^react-native/Libraries/Components/ScrollView/(.*)$': '<rootDir>/node_modules/react-native/Libraries/Components/ScrollView/$1',
    '^react-native/Libraries/Components/Switch/(.*)$': '<rootDir>/node_modules/react-native/Libraries/Components/Switch/$1'
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  setupFiles: [
    'react-native/jest/setup.js',
    '<rootDir>/jest.setup.js'
  ],
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react'
      }
    }
  },
  verbose: true
} 