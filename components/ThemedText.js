"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemedText = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var useThemeColor_1 = require("@/hooks/useThemeColor");
exports.ThemedText = react_1.default.memo(function ThemedText(_a) {
    var style = _a.style, lightColor = _a.lightColor, darkColor = _a.darkColor, _b = _a.type, type = _b === void 0 ? 'default' : _b, accessibilityLabel = _a.accessibilityLabel, accessibilityRole = _a.accessibilityRole, accessibilityState = _a.accessibilityState, accessibilityHint = _a.accessibilityHint, importantForAccessibility = _a.importantForAccessibility, rest = __rest(_a, ["style", "lightColor", "darkColor", "type", "accessibilityLabel", "accessibilityRole", "accessibilityState", "accessibilityHint", "importantForAccessibility"]);
    var color = (0, useThemeColor_1.useThemeColor)({ light: lightColor, dark: darkColor }, 'text');
    var textStyle = (0, react_1.useMemo)(function () { return [
        { color: color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
    ]; }, [color, type, style]);
    return (<react_native_1.Text style={textStyle} accessibilityLabel={accessibilityLabel} accessibilityRole={accessibilityRole} accessibilityState={accessibilityState} accessibilityHint={accessibilityHint} importantForAccessibility={importantForAccessibility} {...rest}/>);
});
var styles = react_native_1.StyleSheet.create({
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
