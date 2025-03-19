import Expo2DContext from 'expo-2d-context'
import { Asset } from 'expo-asset'
import { GLView, GLViewProps } from 'expo-gl'
import React from 'react'

export type PixelData = {
asset: Asset
data: Uint8ClampedArray
height: number
width: number
}

export type PixelDataSource = Omit<PixelData, 'data'>

type GetPixelDataParams = {
  expo2dContext: Expo2DContext
  source: PixelDataSource
}

export const getPixelData = async (
params: GetPixelDataParams
): Promise<PixelData> => {
  const { expo2dContext, source } = params
  const rectangle = [0, 0, source.width, source.height] as const
  // @ts-ignore
  expo2dContext.drawImage(source.asset, ...rectangle)
  return { ...source, data: expo2dContext.getImageData(...rectangle).data }
}

type GLViewWithPixelDataProps = Omit<
GLViewProps,
'enableExperimentalWorkletSupport' | 'msaaSamples' | 'onContextCreate'
> & {
  isHidden?: boolean
  source: PixelDataSource
  onPixelDataChange: (pixelData: PixelData) => void
}

export function GLViewWithPixelData(props: GLViewWithPixelDataProps) {
const { isHidden = false, source, onPixelDataChange, ...rest } = props

interface Style {
  height: number
  width: number
  opacity?: number
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto'
  position?: 'fixed' | 'static' | 'relative' | 'absolute' | 'sticky'
  zIndex?: number
}

interface OnContextCreateParams {
  drawingBufferHeight: number
  drawingBufferWidth: number
}

return source.height > 0 && source.width > 0 ? (
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
    } as Style}
    onContextCreate={async (glContext: OnContextCreateParams) => {
      if (
        glContext.drawingBufferHeight > 1 &&
        glContext.drawingBufferWidth > 1
      ) {
        // @ts-ignore
        const expo2dContext = new Expo2DContext(glContext, {
          renderWithOffscreenBuffer: true,
        })
        const pixelData = await getPixelData({ expo2dContext, source })
        onPixelDataChange(pixelData)
      }
    }}
    {...rest}
  />
) : null
}