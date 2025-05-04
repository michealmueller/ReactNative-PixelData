import Expo2DContext from 'expo-2d-context';
import { Asset } from 'expo-asset';
import { GLViewProps } from 'expo-gl';
import React from 'react';
export type PixelData = {
    asset: Asset;
    data: Uint8ClampedArray;
    height: number;
    width: number;
};
export type PixelDataSource = {
    asset: Asset;
    height: number;
    width: number;
};
export type GetPixelDataParams = {
    expo2dContext: Expo2DContext;
    source: PixelDataSource;
};
export declare class PixelDataError extends Error {
    constructor(message: string);
}
export declare const getPixelData: (params: GetPixelDataParams) => Promise<PixelData>;
type GLViewWithPixelDataProps = Omit<GLViewProps, 'enableExperimentalWorkletSupport' | 'msaaSamples' | 'onContextCreate'> & {
    isHidden?: boolean;
    source: PixelDataSource;
    onPixelDataChange: (pixelData: PixelData) => void;
    onError?: (error: Error) => void;
};
export declare function GLViewWithPixelData(props: GLViewWithPixelDataProps): React.JSX.Element | null;
export {};
