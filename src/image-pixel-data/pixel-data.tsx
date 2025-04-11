import Expo2DContext from 'expo-2d-context';
import { Asset } from 'expo-asset';
import { GLView, GLViewProps } from 'expo-gl';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type PixelData = {
  asset: Asset;
  data: Uint8ClampedArray;
  height: number;
  width: number;
};

export type PixelDataSource = Omit<PixelData, 'data'>;

type GetPixelDataParams = {
  expo2dContext: Expo2DContext;
  source: PixelDataSource;
};

export const getPixelData = async (
  params: GetPixelDataParams
): Promise<PixelData> => {
  const { expo2dContext, source } = params;
  const rectangle = [0, 0, source.width, source.height] as const;
  // @ts-ignore
  expo2dContext.drawImage(source.asset, ...rectangle);
  return { ...source, data: expo2dContext.getImageData(...rectangle).data };
};

export interface GLViewWithPixelDataProps
  extends Omit<
    GLViewProps,
    'enableExperimentalWorkletSupport' | 'msaaSamples' | 'onContextCreate'
  > {
  isHidden?: boolean;
  source?: PixelDataSource;
  onPixelDataChange?: (pixelData: PixelData) => void;
}

interface GLViewWithPixelDataState {
  source?: PixelDataSource;
}

export class GLViewWithPixelData extends React.Component<
  GLViewWithPixelDataProps,
  GLViewWithPixelDataState
> {
  constructor(props: GLViewWithPixelDataProps) {
    super(props);
    this.state = {
      source: props.source,
    };
  }

  // Public function to accept an image and update the source
  public loadImage = (imageAsset: Asset, width: number, height: number) => {
    this.setState({
      source: {
        asset: imageAsset,
        width,
        height,
      },
    });
  };

  // Callback for when the WebGL context is created
  private onContextCreate = async (glContext: WebGLRenderingContext) => {
    const { onPixelDataChange } = this.props;
    const { source } = this.state;

    if (source && source.height > 0 && source.width > 0) {
      if (glContext.drawingBufferHeight > 1 && glContext.drawingBufferWidth > 1) {
        // @ts-ignore
        const expo2dContext = new Expo2DContext(glContext, {
          renderWithOffscreenBuffer: true,
        });

        const pixelData = await getPixelData({ expo2dContext, source });
        console.log('Pixel Data:', pixelData.data);

        if (onPixelDataChange) {
          onPixelDataChange(pixelData);
        }
      }
    }
  };

  render() {
    const { isHidden = false, ...rest } = this.props;
    const { source } = this.state;

    if (!source || source.height <= 0 || source.width <= 0) {
      return null;
    }

    const style: StyleProp<ViewStyle> = {
      height: source.height,
      width: source.width,
      ...(isHidden && {
        opacity: 0,
        position: 'absolute',
        zIndex: -1,
      }),
    };

    return (
      <GLView
        style={style}
        onContextCreate={this.onContextCreate}
        {...rest}
      />
    );
  }
}