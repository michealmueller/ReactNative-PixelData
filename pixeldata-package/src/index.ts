import { Asset } from 'expo-asset'
import Expo2DContext from 'expo-2d-context'

export interface PixelDataSource {
  asset: Asset
  width: number
  height: number
}

export interface PixelData extends PixelDataSource {
  data: Uint8ClampedArray
}

export class PixelDataError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PixelDataError'
  }
}

export interface GetPixelDataOptions {
  expo2dContext: Expo2DContext
  source: PixelDataSource
}

export async function getPixelData({ expo2dContext, source }: GetPixelDataOptions): Promise<PixelData> {
  try {
    if (!expo2dContext || !source) {
      throw new PixelDataError('Missing required parameters')
    }

    const { width, height, asset } = source

    if (!width || !height || width <= 0 || height <= 0) {
      throw new PixelDataError('Invalid dimensions')
    }

    await asset.downloadAsync()

    // Draw the image with proper parameters
    const rectangle = [0, 0, width, height] as const
    expo2dContext.drawImage(asset, ...rectangle)
    
    // Get the pixel data
    const imageData = expo2dContext.getImageData(...rectangle)
    if (!imageData?.data) {
      throw new PixelDataError('Failed to get image data')
    }
    
    return {
      asset,
      width,
      height,
      data: imageData.data
    }
  } catch (error) {
    if (error instanceof PixelDataError) {
      throw error
    }
    throw new PixelDataError(`Failed to process pixel data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
} 