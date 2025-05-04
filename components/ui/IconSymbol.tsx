// This file is a fallback for using MaterialIcons on Android and web.

import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SymbolWeight } from 'expo-symbols';

type IconSymbolProps = {
  name: string;
  size: number;
  color: string;
  style?: StyleProp<TextStyle>;
};

const MAPPING: Record<string, string> = {
  'house.fill': 'home',
  // Add more mappings as needed
};

export function IconSymbol({ name, size, color, style }: IconSymbolProps) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name] as any} style={style} />;
}
