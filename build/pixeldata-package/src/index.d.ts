import { Asset } from 'expo-asset';
import Expo2DContext from 'expo-2d-context';
export interface PixelDataSource {
    asset: Asset;
    width: number;
    height: number;
}
export interface PixelData extends PixelDataSource {
    data: Uint8ClampedArray;
}
export declare class PixelDataError extends Error {
    constructor(message: string);
}
export interface GetPixelDataOptions {
    expo2dContext: Expo2DContext;
    source: PixelDataSource;
}
export declare function getPixelData({ expo2dContext, source }: GetPixelDataOptions): Promise<PixelData>;
