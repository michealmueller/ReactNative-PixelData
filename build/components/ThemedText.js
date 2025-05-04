import { Text, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
export const ThemedText = React.memo(function ThemedText({ style, lightColor, darkColor, type = 'default', accessibilityLabel, accessibilityRole, accessibilityState, accessibilityHint, importantForAccessibility, ...rest }) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const textStyle = useMemo(() => [
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
    ], [color, type, style]);
    return (<Text style={textStyle} accessibilityLabel={accessibilityLabel} accessibilityRole={accessibilityRole} accessibilityState={accessibilityState} accessibilityHint={accessibilityHint} importantForAccessibility={importantForAccessibility} {...rest}/>);
});
const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 40,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 28,
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
});
