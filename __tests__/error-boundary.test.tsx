"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var react_native_2 = require("react-native");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
// Mock console.error to prevent test output pollution
var originalConsoleError = console.error;
beforeAll(function () {
    console.error = jest.fn();
});
afterAll(function () {
    console.error = originalConsoleError;
});
describe('ErrorBoundary', function () {
    var ErrorComponent = function () {
        throw new Error('Test error');
    };
    var SafeComponent = function () { return <react_native_2.Text>Safe content</react_native_2.Text>; };
    it('should render children when no error occurs', function () {
        (0, react_native_1.render)(<ErrorBoundary_1.ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary_1.ErrorBoundary>);
        expect(react_native_1.screen.getByText('Safe content')).toBeTruthy();
    });
    it('should render error message when error occurs', function () {
        (0, react_native_1.render)(<ErrorBoundary_1.ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary_1.ErrorBoundary>);
        expect(react_native_1.screen.getByText('Something went wrong')).toBeTruthy();
        expect(react_native_1.screen.getByText('Test error')).toBeTruthy();
    });
    it('should render custom fallback component when provided', function () {
        var CustomFallback = function () { return <react_native_2.Text>Custom error message</react_native_2.Text>; };
        (0, react_native_1.render)(<ErrorBoundary_1.ErrorBoundary fallback={<CustomFallback />}>
        <ErrorComponent />
      </ErrorBoundary_1.ErrorBoundary>);
        expect(react_native_1.screen.getByText('Custom error message')).toBeTruthy();
    });
});
