import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { GLView } from 'expo-gl';
import { Asset as ExpoAsset } from 'expo-asset';
import Expo2DContext from 'expo-2d-context';
import { getPixelData } from '@/app/pixel-data';
export default class TabTwoScreen extends React.Component {
    render() {
        return (<ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">PixelData</ThemedText>
        </ThemedView>
        <GLView style={{ flex: 1, width: '100%', height: '100%' }} onContextCreate={this._onGLContextCreate}/>
      </ThemedView>);
    }
    _onGLContextCreate = async (gl) => {
        // Create a 2D context
        const ctx = new Expo2DContext(gl, {
            renderWithOffscreenBuffer: true,
            maxGradStops: 10,
            fastFillTesselation: true,
        });
        // Load the image asset
        const asset = ExpoAsset.fromModule(require('@/assets/quality-test-images/valid.jpeg'));
        await asset.downloadAsync();
        // Prepare parameters for pixel data extraction
        const params = {
            expo2dContext: ctx,
            source: {
                asset: asset,
                height: 600,
                width: 800,
            },
        };
        // Fetch and log pixel data
        const pixelData = await getPixelData(params);
        console.log('Pixel Data:', pixelData.data);
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
