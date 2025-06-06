import Expo2DContext from 'expo-2d-context'
import { Asset } from 'expo-asset'
import { GLView, GLViewProps } from 'expo-gl'
import React, { useEffect, useRef, useCallback } from 'react'

export type PixelData = {
  asset: Asset
  data: Uint8ClampedArray
  height: number
  width: number
}

export type PixelDataSource = {
  asset: Asset
  height: number
  width: number
}

export type GetPixelDataParams = {
  expo2dContext: Expo2DContext
  source: PixelDataSource
}

export class PixelDataError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PixelDataError'
  }
}

const validatePixelDataParams = (params: GetPixelDataParams): void => {
  if (!params.expo2dContext || !params.source) {
    throw new PixelDataError('Missing required parameters')
  }

  if (params.source.width <= 0 || params.source.height <= 0) {
    throw new PixelDataError('Invalid image dimensions')
  }

  if (!params.source.asset) {
    throw new PixelDataError('Invalid asset')
  }
}

export const getPixelData = async (
  params: GetPixelDataParams
): Promise<PixelData> => {
  try {
    validatePixelDataParams(params)
    const { expo2dContext, source } = params

    const rectangle = [0, 0, source.width, source.height] as const
    expo2dContext.drawImage(source.asset, ...rectangle)
    
    const imageData = expo2dContext.getImageData(...rectangle)
    if (!imageData?.data) {
      throw new PixelDataError('Failed to get image data')
    }

    return { ...source, data: imageData.data }
  } catch (error) {
    if (error instanceof Error) {
      throw new PixelDataError(`Failed to process pixel data: ${error.message}`);
    }
    throw new PixelDataError('Failed to process pixel data: Unknown error');
  }
}

type GLViewWithPixelDataProps = Omit<
  GLViewProps,
  'enableExperimentalWorkletSupport' | 'msaaSamples' | 'onContextCreate'
> & {
  isHidden?: boolean
  source: PixelDataSource
  onPixelDataChange: (pixelData: PixelData) => void
  onError?: (error: Error) => void
}

export function GLViewWithPixelData(props: GLViewWithPixelDataProps) {
  const { isHidden = false, source, onPixelDataChange, onError, ...rest } = props
  const glContextRef = useRef<Expo2DContext | null>(null)

  useEffect(() => {
    return () => {
      if (glContextRef.current) {
        glContextRef.current = null
      }
    }
  }, [])

  const handleContextCreate = useCallback(async (glContext: {
    drawingBufferHeight: number
    drawingBufferWidth: number
  }) => {
    try {
      if (glContext.drawingBufferHeight <= 1 || glContext.drawingBufferWidth <= 1) {
        throw new PixelDataError('Invalid GL context dimensions')
      }

      const expo2dContext = new Expo2DContext(glContext, {
        renderWithOffscreenBuffer: true,
      })
      glContextRef.current = expo2dContext

      const pixelData = await getPixelData({ expo2dContext, source })
      onPixelDataChange(pixelData)
    } catch (error) {
      if (onError) {
        onError(error instanceof Error ? error : new Error(String(error)))
      }
    }
  }, [source, onPixelDataChange, onError])

  if (source.height <= 0 || source.width <= 0) {
    return null
  }

  return (
    <GLView
      style={{
        height: source.height,
        width: source.width,
        ...(isHidden && {
          opacity: 0,
          pointerEvents: 'none',
          position: 'absolute',
          zIndex: -1,
        }),
      }}
      onContextCreate={handleContextCreate}
      {...rest}
    />
  )
}