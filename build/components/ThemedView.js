import React from 'react';
import { View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
export function ThemedView({ style, lightColor, darkColor, accessibilityLabel, accessibilityRole, accessibilityState, accessibilityHint, importantForAccessibility, ...otherProps }) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    return (<View style={[{ backgroundColor }, style]} accessibilityLabel={accessibilityLabel} accessibilityRole={accessibilityRole} accessibilityState={accessibilityState} accessibilityHint={accessibilityHint} importantForAccessibility={importantForAccessibility} {...otherProps}/>);
}
