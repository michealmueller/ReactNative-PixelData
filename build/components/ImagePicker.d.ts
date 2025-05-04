import * as React from 'react';
import * as ImagePickerModule from 'expo-image-picker';
interface ImagePickerProps {
    onImageSelected: (image: ImagePickerModule.ImagePickerResult) => void;
    onError: (error: Error) => void;
}
export declare const ImagePickerComponent: React.FC<ImagePickerProps>;
export {};
