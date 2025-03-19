declare module 'react-native-pixel-jpg' {
interface PixelData {
    width: number;
    height: number;
    data: Buffer;
}

interface PixelJpg {
    parse(file: string): Promise<PixelData[]>;
}

function PixelJpg(): PixelJpg;

export default PixelJpg;
}