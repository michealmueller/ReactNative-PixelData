import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
type IconSymbolProps = {
    name: string;
    size: number;
    color: string;
    style?: StyleProp<TextStyle>;
};
export declare function IconSymbol({ name, size, color, style }: IconSymbolProps): React.JSX.Element;
export {};
