import { getPixelData, PixelDataError } from '../index'
import { Asset } from 'expo-asset'
import Expo2DContext from 'expo-2d-context'

// Mock expo-2d-context
jest.mock('expo-2d-context', () => {
  return jest.fn().mockImplementation((gl, options) => ({
    drawImage: jest.fn(),
    getImageData: jest.fn().mockReturnValue({
      data: new Uint8ClampedArray([255, 0, 0, 255]) // Red pixel
    })
  }))
})

// Mock expo-asset
jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: jest.fn().mockReturnValue({
      downloadAsync: jest.fn().mockResolvedValue(undefined)
    })
  }
}))

describe('getPixelData', () => {
  let mockContext: Expo2DContext
  let mockAsset: Asset

  beforeEach(() => {
    mockContext = new Expo2DContext(1, {
      maxGradStops: 10,
      renderWithOffscreenBuffer: false,
      fastFillTesselation: false
    })
    mockAsset = Asset.fromModule('test-image')
  })

  it('should throw error when context is missing', async () => {
    await expect(getPixelData({
      expo2dContext: null as any,
      source: {
        asset: mockAsset,
        width: 100,
        height: 100
      }
    })).rejects.toThrow('Missing required parameters')
  })

  it('should throw error when source is missing', async () => {
    await expect(getPixelData({
      expo2dContext: mockContext,
      source: null as any
    })).rejects.toThrow('Missing required parameters')
  })

  it('should throw error when dimensions are invalid', async () => {
    await expect(getPixelData({
      expo2dContext: mockContext,
      source: {
        asset: mockAsset,
        width: 0,
        height: 100
      }
    })).rejects.toThrow('Invalid dimensions')
  })

  it('should return pixel data for valid input', async () => {
    const result = await getPixelData({
      expo2dContext: mockContext,
      source: {
        asset: mockAsset,
        width: 100,
        height: 100
      }
    })

    expect(result).toEqual({
      asset: mockAsset,
      width: 100,
      height: 100,
      data: expect.any(Uint8ClampedArray)
    })
  })

  it('should handle asset download error', async () => {
    (mockAsset.downloadAsync as jest.Mock).mockRejectedValue(new Error('Download failed'))

    await expect(getPixelData({
      expo2dContext: mockContext,
      source: {
        asset: mockAsset,
        width: 100,
        height: 100
      }
    })).rejects.toThrow('Failed to process pixel data: Download failed')
  })

  it('should handle context error', async () => {
    // Reset downloadAsync mock to resolve
    (mockAsset.downloadAsync as jest.Mock).mockResolvedValue(undefined)
    
    // Mock getImageData to throw an error
    const mockGetImageData = jest.fn().mockImplementation(() => {
      throw new Error('Context error')
    })
    ;(mockContext as any).getImageData = mockGetImageData

    await expect(getPixelData({
      expo2dContext: mockContext,
      source: {
        asset: mockAsset,
        width: 100,
        height: 100
      }
    })).rejects.toThrow('Failed to process pixel data: Context error')
  })
}) 