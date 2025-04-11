import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Asset as ExpoAsset } from 'expo-asset';
import Expo2DContext from 'expo-2d-context';
import { getPixelData } from '@/app/pixel-data';

export default class TabTwoScreen extends React.Component {
  render() {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">PixelData</ThemedText>
        </ThemedView>
        <GLView
          style={{ flex: 1, width: '100%', height: '100%' }}
          onContextCreate={this._onGLContextCreate}
        />
      </ThemedView>
    );
  }

  _onGLContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    // Create a 2D context
    const ctx = new Expo2DContext(gl, {
      renderWithOffscreenBuffer: true,
      maxGradStops: 10,
      fastFillTesselation: true,
    });

    // Load the image asset
    const asset = ExpoAsset.fromModule(require('@/assets/quality-test-images/power-valid.jpg'));
    await asset.downloadAsync();
    const width = 800;
    const height = 600;

    // Prepare parameters for pixel data extraction
    const params = {
      expo2dContext: ctx,
      source: {
        asset: asset,
        height,
        width,
      },
    };

    // Fetch and log pixel data
    const pixelData = await getPixelData(params);
    // console.log('Pixel Data:', pixelData.data);

    const pixelArray = pixelData.data;
    const pixelCount = pixelArray.length / 4;

    let luminanceSum = 0;

    const luminanceMatrix: number[][] = [];

  for (let y = 0; y < height; y++) {
    const row: number[] = [];
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = pixelArray[i];
      const g = pixelArray[i + 1];
      const b = pixelArray[i + 2];
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      row.push(luminance);
      luminanceSum += luminance;
    }
    luminanceMatrix.push(row);
  }

  const avgLuminance = luminanceSum / pixelCount;
  console.log('Average Luminance:', avgLuminance);

  if (avgLuminance < 50) {
    console.warn('Image is too dark.');
  } else if (avgLuminance > 200) {
    console.warn('Image is too bright.');
  } else {
    console.log('Image luminance is acceptable.');
  }

  // --- Sharpness / Blur Detection (Laplacian Variance) ---
  const kernel = [
    [0,  1, 0],
    [1, -4, 1],
    [0,  1, 0]
  ];

  const laplacianValues: number[] = [];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let laplacian = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          laplacian += kernel[ky + 1][kx + 1] * luminanceMatrix[y + ky][x + kx];
        }
      }
      laplacianValues.push(Math.abs(laplacian));
    }
  }

  const mean = laplacianValues.reduce((sum, val) => sum + val, 0) / laplacianValues.length;
  const variance = laplacianValues.reduce((sum, val) => sum + (val - mean) ** 2, 0) / laplacianValues.length;

  console.log('Sharpness (Laplacian Variance):', variance);

  if (variance < 75) {
    console.warn('Image may be blurry or out of focus.');
  } else {
    console.log('Image sharpness is acceptable.');
  }
};
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});