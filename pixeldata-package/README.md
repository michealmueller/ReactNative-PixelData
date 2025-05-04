# @rosievision/pixel-data

A React Native package for extracting pixel data from images using Expo.

## Installation

```bash
# Using yarn
yarn add @rosievision/pixel-data

# Using npm
npm install @rosievision/pixel-data
```

## Requirements

This package requires the following peer dependencies:
- expo (>=52.0.0)
- expo-2d-context (>=0.0.4)
- expo-gl (>=15.0.0)
- expo-asset (>=9.0.0)
- react (>=18.0.0)
- react-native (>=0.70.0)

## Usage

```typescript
import { Asset } from 'expo-asset';
import Expo2DContext from 'expo-2d-context';
import { getPixelData } from '@rosievision/pixel-data';

async function extractPixelData() {
  // Create an asset from your image
  const asset = Asset.fromModule(require('./path/to/your/image.jpg'));
  
  // Create a 2D context with desired dimensions
  const context = new Expo2DContext(100, 100);
  
  try {
    const pixelData = await getPixelData({
      expo2dContext: context,
      source: {
        asset,
        width: 100,
        height: 100
      }
    });
    
    // pixelData.data contains the Uint8ClampedArray of RGBA values
    console.log(pixelData.data);
  } catch (error) {
    console.error('Failed to extract pixel data:', error);
  }
}
```

## API

### getPixelData(options)

Extracts pixel data from an image asset.

#### Options

- `expo2dContext`: An instance of Expo2DContext
- `source`: An object containing:
  - `asset`: An Expo Asset instance
  - `width`: The width to extract pixels from
  - `height`: The height to extract pixels from

#### Returns

Returns a Promise that resolves to a PixelData object containing:
- `asset`: The original asset
- `width`: The width of the extracted data
- `height`: The height of the extracted data
- `data`: A Uint8ClampedArray containing the RGBA values

## Error Handling

The package throws `PixelDataError` in case of errors during pixel data extraction. Common errors include:
- Missing required parameters
- Invalid dimensions
- Failed to download asset
- Failed to get 2D context
- Failed to extract pixel data

## License

MIT 