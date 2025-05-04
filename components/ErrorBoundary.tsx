import React, { Component, ErrorInfo, ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ThemedView style={styles.container}>
          <ThemedText type="title">Something went wrong</ThemedText>
          <ThemedText type="default">
            {this.state.error?.message || 'An unexpected error occurred'}
          </ThemedText>
        </ThemedView>
      )
    }

    return this.props.children
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
}) 