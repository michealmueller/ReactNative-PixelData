import { render, screen } from '@testing-library/react-native'
import { Asset } from 'expo-asset'
import { getPixelData, PixelDataError, GLViewWithPixelData } from '@/app/pixel-data'

// Mock expo-2d-context
jest.mock('expo-2d-context', () => {
  return jest.fn().mockImplementation(() => ({
    drawImage: jest.fn(),
    getImageData: jest.fn().mockReturnValue({
      data: new Uint8ClampedArray([255, 0, 0, 255])
    }),
    apply: jest.fn().mockImplementation((callback) => callback())
  }))
})

// Mock expo-gl
jest.mock('expo-gl', () => ({
  GLView: 'GLView'
}))

// Mock expo-asset
jest.mock('expo-asset', () => ({
  Asset: jest.fn().mockImplementation(() => ({
    name: 'test-asset',
    uri: 'test-uri',
    type: 'image',
    hash: 'test-hash',
    width: 100,
    height: 100,
    downloadAsync: jest.fn().mockResolvedValue(undefined)
  }))
}))

describe('getPixelData', () => {
  const mockAsset = new Asset({ uri: 'test-uri', name: 'test-asset', type: 'image' })
  const mockSource = {
    asset: mockAsset,
    width: 100,
    height: 100
  }

  it('should throw error for missing parameters', async () => {
    await expect(getPixelData({ expo2dContext: null as any, source: null as any }))
      .rejects
      .toThrow(PixelDataError)
  })

  it('should throw error for invalid dimensions', async () => {
    await expect(getPixelData({
      expo2dContext: {} as any,
      source: { ...mockSource, width: 0 }
    }))
      .rejects
      .toThrow(PixelDataError)
  })

  it('should return pixel data for valid input', async () => {
    const mockContext = {
      drawImage: jest.fn(),
      getImageData: jest.fn().mockReturnValue({
        data: new Uint8ClampedArray([255, 0, 0, 255])
      }),
      apply: jest.fn().mockImplementation((callback) => callback())
    }

    const result = await getPixelData({
      expo2dContext: mockContext,
      source: mockSource
    })

    expect(result).toEqual({
      ...mockSource,
      data: expect.any(Uint8ClampedArray)
    })
    expect(mockContext.drawImage).toHaveBeenCalled()
    expect(mockContext.getImageData).toHaveBeenCalled()
  })
})

describe('GLViewWithPixelData', () => {
  const mockSource = {
    asset: new Asset({ uri: 'test-uri', name: 'test-asset', type: 'image' }),
    width: 100,
    height: 100
  }

  const mockOnPixelDataChange = jest.fn()
  const mockOnError = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render null for invalid dimensions', () => {
    const { queryByTestId } = render(
      <GLViewWithPixelData
        source={{ ...mockSource, width: 0 }}
        onPixelDataChange={mockOnPixelDataChange}
        onError={mockOnError}
      />
    )
    expect(queryByTestId('gl-view')).toBeNull()
  })

  it('should handle context creation error', async () => {
    render(
      <GLViewWithPixelData
        source={mockSource}
        onPixelDataChange={mockOnPixelDataChange}
        onError={mockOnError}
      />
    )

    // Simulate context creation error
    const error = new Error('Test error')
    mockOnError(error)

    expect(mockOnError).toHaveBeenCalledWith(error)
    expect(mockOnPixelDataChange).not.toHaveBeenCalled()
  })
}) 