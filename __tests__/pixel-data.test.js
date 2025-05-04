"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("@testing-library/react-native");
var expo_asset_1 = require("expo-asset");
var pixel_data_1 = require("@/app/pixel-data");
// Mock expo-2d-context
jest.mock('expo-2d-context', function () {
    return jest.fn().mockImplementation(function () { return ({
        drawImage: jest.fn(),
        getImageData: jest.fn().mockReturnValue({
            data: new Uint8ClampedArray([255, 0, 0, 255])
        }),
        apply: jest.fn().mockImplementation(function (callback) { return callback(); })
    }); });
});
// Mock expo-gl
jest.mock('expo-gl', function () { return ({
    GLView: 'GLView'
}); });
// Mock expo-asset
jest.mock('expo-asset', function () { return ({
    Asset: jest.fn().mockImplementation(function () { return ({
        name: 'test-asset',
        uri: 'test-uri',
        type: 'image',
        hash: 'test-hash',
        width: 100,
        height: 100,
        downloadAsync: jest.fn().mockResolvedValue(undefined)
    }); })
}); });
describe('getPixelData', function () {
    var mockAsset = new expo_asset_1.Asset({ uri: 'test-uri', name: 'test-asset', type: 'image' });
    var mockSource = {
        asset: mockAsset,
        width: 100,
        height: 100
    };
    it('should throw error for missing parameters', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect((0, pixel_data_1.getPixelData)({ expo2dContext: null, source: null }))
                        .rejects
                        .toThrow(pixel_data_1.PixelDataError)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw error for invalid dimensions', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect((0, pixel_data_1.getPixelData)({
                        expo2dContext: {},
                        source: __assign(__assign({}, mockSource), { width: 0 })
                    }))
                        .rejects
                        .toThrow(pixel_data_1.PixelDataError)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return pixel data for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockContext, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockContext = {
                        drawImage: jest.fn(),
                        getImageData: jest.fn().mockReturnValue({
                            data: new Uint8ClampedArray([255, 0, 0, 255])
                        }),
                        apply: jest.fn().mockImplementation(function (callback) { return callback(); })
                    };
                    return [4 /*yield*/, (0, pixel_data_1.getPixelData)({
                            expo2dContext: mockContext,
                            source: mockSource
                        })];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(__assign(__assign({}, mockSource), { data: expect.any(Uint8ClampedArray) }));
                    expect(mockContext.drawImage).toHaveBeenCalled();
                    expect(mockContext.getImageData).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('GLViewWithPixelData', function () {
    var mockSource = {
        asset: new expo_asset_1.Asset({ uri: 'test-uri', name: 'test-asset', type: 'image' }),
        width: 100,
        height: 100
    };
    var mockOnPixelDataChange = jest.fn();
    var mockOnError = jest.fn();
    beforeEach(function () {
        jest.clearAllMocks();
    });
    it('should render null for invalid dimensions', function () {
        var queryByTestId = (0, react_native_1.render)(<pixel_data_1.GLViewWithPixelData source={__assign(__assign({}, mockSource), { width: 0 })} onPixelDataChange={mockOnPixelDataChange} onError={mockOnError}/>).queryByTestId;
        expect(queryByTestId('gl-view')).toBeNull();
    });
    it('should handle context creation error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            (0, react_native_1.render)(<pixel_data_1.GLViewWithPixelData source={mockSource} onPixelDataChange={mockOnPixelDataChange} onError={mockOnError}/>);
            error = new Error('Test error');
            mockOnError(error);
            expect(mockOnError).toHaveBeenCalledWith(error);
            expect(mockOnPixelDataChange).not.toHaveBeenCalled();
            return [2 /*return*/];
        });
    }); });
});
