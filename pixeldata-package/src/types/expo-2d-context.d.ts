declare module 'expo-2d-context' {
  import { Asset } from 'expo-asset'

  interface ImageData {
    data: Uint8ClampedArray
  }

  class Expo2DContext {
    constructor(gl: any, options?: {
      maxGradStops?: number
      renderWithOffscreenBuffer?: boolean
      fastFillTesselation?: boolean
    })

    drawImage(image: Asset, x: number, y: number, width: number, height: number): void
    getImageData(x: number, y: number, width: number, height: number): ImageData
  }

  export default Expo2DContext
} 