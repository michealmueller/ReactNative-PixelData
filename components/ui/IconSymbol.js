"use strict";
// This file is a fallback for using MaterialIcons on Android and web.
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconSymbol = IconSymbol;
var MaterialIcons_1 = require("@expo/vector-icons/MaterialIcons");
var react_1 = require("react");
// Add your SFSymbol to MaterialIcons mappings here.
var MAPPING = {
    // See MaterialIcons here: https://icons.expo.fyi
    // See SF Symbols in the SF Symbols app on Mac.
    'house.fill': 'home',
    'paperplane.fill': 'send',
    'chevron.left.forwardslash.chevron.right': 'code',
    'chevron.right': 'chevron-right',
};
/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
function IconSymbol(_a) {
    var name = _a.name, _b = _a.size, size = _b === void 0 ? 24 : _b, color = _a.color, style = _a.style;
    return <MaterialIcons_1.default color={color} size={size} name={MAPPING[name]} style={style}/>;
}
