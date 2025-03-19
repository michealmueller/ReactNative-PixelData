import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { GLView, ExpoWebGLRenderingContext } from 'expo-gl';
import { Image as ExpoImage } from 'expo-image';
import { getPixelData } from '@/app/pixel-data';
import { Asset as ExpoAsset } from 'expo-asset';
import Expo2DContext from 'expo-2d-context';

export interface PixelData{
  asset: ExpoAsset;
  data: Uint8ClampedArray;
  height: number;
  width: number;
};

export type PixelDataSource = Omit<PixelData, 'data'>; // extending through omission

interface GetPixelDataParams {
  expo2dContext: Expo2DContext;
  source: PixelDataSource;
};

export default class TabTwoScreen extends React.Component {  
  render(){
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
    
    const glId: number = gl.contextId;
    // !! NOT SURE WHY THIS IS AN ERROR BUT IT IS EVERYTHING WORKS THOUGH SO ITS GOOD NEED TO FIGURE OUT HOW TO IGNORE IT
    let ctx = new Expo2DContext(gl,{
        renderWithOffscreenBuffer: true,
        maxGradStops: 10,
        fastFillTesselation: true,
      }
    );
    
    //? File system example
    //? since the image will exists on the device, we can use the file system to get the image
    
    const asset = ExpoAsset.fromModule(require('@/assets/quality-test-images/valid.jpeg'));
    
    //? remote file url example
    //? this is the method you would want to use with azure storage
    //const asset = ExpoAsset.fromURI('https://placehold.co/800x600');
  // console.log('asset: ', asset);
    await asset.downloadAsync();
    //console.log('asset afte dl: ', asset);
    const image = new ExpoImage(asset);
    //console.log('image: ', image);

    const params:GetPixelDataParams = {
      expo2dContext: ctx,
      source: {
        asset: asset,
        height: 600,
        width: 800,
      },
    };
    
    const pixelData = await getPixelData(params).then((data: PixelData) => {
      const dataArray = data.data;
      console.log('data: ', dataArray); // <---------------------- PIXEL DATA!!!!!!!
      const buffer = Buffer.from(dataArray);
      console.log('buffer: ', buffer);
      const base64Data = buffer.toString('base64');
      console.log('Base64 Pixel Data: ', base64Data);
      //return data;
    });
    console.log('pixelData: ', pixelData);

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 10,
    backgroundColor:'#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
function createImageArray(images: ExpoAsset[]) {
  const imageArray: {uri: string}[] = [];
  images.forEach((image) => {
    imageArray.push({ uri: image.uri });
  });
  return imageArray;
}
function drawRobotFace(ctx: Expo2DContext) {
  ctx.translate(50, 200);
  ctx.scale(4, 4);
  ctx.fillStyle = "grey";
  ctx.fillRect(20, 40, 100, 100);
  ctx.fillStyle = "white";
  ctx.fillRect(30, 100, 20, 30);
  ctx.fillRect(60, 100, 20, 30);
  ctx.fillRect(90, 100, 20, 30);
  ctx.beginPath();
  ctx.arc(50, 70, 18, 0, 2 * Math.PI);
  ctx.arc(90, 70, 18, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "grey";
  ctx.beginPath();
  ctx.arc(50, 70, 8, 0, 2 * Math.PI);
  ctx.arc(90, 70, 8, 0, 2 * Math.PI);
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.beginPath();    
  ctx.moveTo(70, 40);
  ctx.lineTo(70, 30);
  ctx.arc(70, 20, 10, 0.5 * Math.PI, 2.5 * Math.PI);
  ctx.stroke();
  ctx.flush();
}