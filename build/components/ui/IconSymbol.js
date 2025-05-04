// This file is a fallback for using MaterialIcons on Android and web.
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
const MAPPING = {
    'house.fill': 'home',
    // Add more mappings as needed
};
export function IconSymbol({ name, size, color, style }) {
    return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style}/>;
}
