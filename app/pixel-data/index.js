"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPixelData = exports.PixelDataError = void 0;
exports.GLViewWithPixelData = GLViewWithPixelData;
var expo_2d_context_1 = require("expo-2d-context");
var expo_gl_1 = require("expo-gl");
var react_1 = require("react");
var PixelDataError = /** @class */ (function (_super) {
    __extends(PixelDataError, _super);
    function PixelDataError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'PixelDataError';
        return _this;
    }
    return PixelDataError;
}(Error));
exports.PixelDataError = PixelDataError;
var validatePixelDataParams = function (params) {
    if (!params.expo2dContext || !params.source) {
        throw new PixelDataError('Missing required parameters');
    }
    if (params.source.width <= 0 || params.source.height <= 0) {
        throw new PixelDataError('Invalid image dimensions');
    }
    if (!params.source.asset) {
        throw new PixelDataError('Invalid asset');
    }
};
var getPixelData = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var expo2dContext, source, rectangle, imageData;
    return __generator(this, function (_a) {
        try {
            validatePixelDataParams(params);
            expo2dContext = params.expo2dContext, source = params.source;
            rectangle = [0, 0, source.width, source.height];
            expo2dContext.drawImage.apply(expo2dContext, __spreadArray([source.asset], rectangle, false));
            imageData = expo2dContext.getImageData.apply(expo2dContext, rectangle);
            if (!(imageData === null || imageData === void 0 ? void 0 : imageData.data)) {
                throw new PixelDataError('Failed to get image data');
            }
            return [2 /*return*/, __assign(__assign({}, source), { data: imageData.data })];
        }
        catch (error) {
            if (error instanceof PixelDataError) {
                throw error;
            }
            throw new PixelDataError("Failed to process pixel data: ".concat(error.message));
        }
        return [2 /*return*/];
    });
}); };
exports.getPixelData = getPixelData;
function GLViewWithPixelData(props) {
    var _this = this;
    var _a = props.isHidden, isHidden = _a === void 0 ? false : _a, source = props.source, onPixelDataChange = props.onPixelDataChange, onError = props.onError, rest = __rest(props, ["isHidden", "source", "onPixelDataChange", "onError"]);
    var glContextRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        return function () {
            if (glContextRef.current) {
                glContextRef.current = null;
            }
        };
    }, []);
    var handleContextCreate = (0, react_1.useCallback)(function (glContext) { return __awaiter(_this, void 0, void 0, function () {
        var expo2dContext, pixelData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (glContext.drawingBufferHeight <= 1 || glContext.drawingBufferWidth <= 1) {
                        throw new PixelDataError('Invalid GL context dimensions');
                    }
                    expo2dContext = new expo_2d_context_1.default(glContext, {
                        renderWithOffscreenBuffer: true,
                    });
                    glContextRef.current = expo2dContext;
                    return [4 /*yield*/, (0, exports.getPixelData)({ expo2dContext: expo2dContext, source: source })];
                case 1:
                    pixelData = _a.sent();
                    onPixelDataChange(pixelData);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (onError) {
                        onError(error_1 instanceof Error ? error_1 : new Error(String(error_1)));
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [source, onPixelDataChange, onError]);
    if (source.height <= 0 || source.width <= 0) {
        return null;
    }
    return (<expo_gl_1.GLView style={__assign({ height: source.height, width: source.width }, (isHidden && {
            opacity: 0,
            pointerEvents: 'none',
            position: 'absolute',
            zIndex: -1,
        }))} onContextCreate={handleContextCreate} {...rest}/>);
}
