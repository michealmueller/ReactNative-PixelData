import React from 'react'
import { View, ViewProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  accessibilityLabel?: string;
  accessibilityRole?: 'none' | 'button' | 'link' | 'search' | 'image' | 'keyboardkey' | 'text' | 'adjustable' | 'imagebutton' | 'header' | 'summary' | 'alert' | 'checkbox' | 'combobox' | 'menu' | 'menubar' | 'menuitem' | 'progressbar' | 'radio' | 'radiogroup' | 'scrollbar' | 'spinbutton' | 'switch' | 'tab' | 'tablist' | 'timer' | 'toolbar';
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
  accessibilityHint?: string;
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants';
};

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor, 
  accessibilityLabel,
  accessibilityRole,
  accessibilityState,
  accessibilityHint,
  importantForAccessibility,
  ...otherProps 
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View
      style={[{ backgroundColor }, style]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      accessibilityHint={accessibilityHint}
      importantForAccessibility={importantForAccessibility}
      {...otherProps}
    />
  );
}
