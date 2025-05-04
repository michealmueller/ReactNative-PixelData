import { render, screen } from '@testing-library/react-native'
import { Text } from 'react-native'
import { ErrorBoundary } from '@/components/ErrorBoundary'

// Mock console.error to prevent test output pollution
const originalConsoleError = console.error
beforeAll(() => {
  console.error = jest.fn()
})
afterAll(() => {
  console.error = originalConsoleError
})

describe('ErrorBoundary', () => {
  const ErrorComponent = () => {
    throw new Error('Test error')
  }

  const SafeComponent = () => <Text>Safe content</Text>

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Safe content')).toBeTruthy()
  })

  it('should render error message when error occurs', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Something went wrong')).toBeTruthy()
  })

  it('should render custom fallback component when provided', () => {
    const CustomFallback = () => <Text>Custom fallback</Text>
    render(
      <ErrorBoundary fallback={<CustomFallback />}>
        <ErrorComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Custom fallback')).toBeTruthy()
  })
}) 