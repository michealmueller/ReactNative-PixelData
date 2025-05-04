export let preset: string;
export let testEnvironment: string;
export let transform: {
    '^.+\\.tsx?$': string;
};
export let moduleFileExtensions: string[];
export let testMatch: string[];
export let transformIgnorePatterns: string[];
export let moduleNameMapper: {
    '^@/(.*)$': string;
};
