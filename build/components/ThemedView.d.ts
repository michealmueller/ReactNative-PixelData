import React from 'react';
import { ViewProps } from 'react-native';
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
export declare function ThemedView({ style, lightColor, darkColor, accessibilityLabel, accessibilityRole, accessibilityState, accessibilityHint, importantForAccessibility, ...otherProps }: ThemedViewProps): React.JSX.Element;
