"use strict";
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
var index_1 = require("../index");
var expo_asset_1 = require("expo-asset");
var expo_2d_context_1 = require("expo-2d-context");
// Mock expo-2d-context
jest.mock('expo-2d-context', () => {
    const mockContext = {
        drawImage: jest.fn(),
        getImageData: jest.fn().mockReturnValue({
            data: new Uint8ClampedArray([255, 0, 0, 255]) // Red pixel
        })
    };
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => mockContext)
    };
});
// Mock expo-asset
jest.mock('expo-asset', function () { return ({
    Asset: {
        fromModule: jest.fn().mockReturnValue({
            downloadAsync: jest.fn().mockResolvedValue(undefined)
        })
    }
}); });
describe('getPixelData', function () {
    var mockContext;
    var mockAsset;
    beforeEach(function () {
        mockContext = new expo_2d_context_1.default(1, {
            maxGradStops: 10,
            renderWithOffscreenBuffer: false,
            fastFillTesselation: false
        });
        mockAsset = expo_asset_1.Asset.fromModule('test-image');
    });
    it('should throw error when context is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect((0, index_1.getPixelData)({
                        expo2dContext: null,
                        source: {
                            asset: mockAsset,
                            width: 100,
                            height: 100
                        }
                    })).rejects.toThrow('Missing required parameters')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw error when source is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect((0, index_1.getPixelData)({
                        expo2dContext: mockContext,
                        source: null
                    })).rejects.toThrow('Missing required parameters')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw error when dimensions are invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect((0, index_1.getPixelData)({
                        expo2dContext: mockContext,
                        source: {
                            asset: mockAsset,
                            width: 0,
                            height: 100
                        }
                    })).rejects.toThrow('Invalid dimensions')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return pixel data for valid input', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, index_1.getPixelData)({
                        expo2dContext: mockContext,
                        source: {
                            asset: mockAsset,
                            width: 100,
                            height: 100
                        }
                    })];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual({
                        asset: mockAsset,
                        width: 100,
                        height: 100,
                        data: expect.any(Uint8ClampedArray)
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle asset download error', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockAsset.downloadAsync.mockRejectedValue(new Error('Download failed'));
                    return [4 /*yield*/, expect((0, index_1.getPixelData)({
                            expo2dContext: mockContext,
                            source: {
                                asset: mockAsset,
                                width: 100,
                                height: 100
                            }
                        })).rejects.toThrow('Failed to process pixel data: Download failed')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle context error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockGetImageData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Reset downloadAsync mock to resolve
                    mockAsset.downloadAsync.mockResolvedValue(undefined);
                    mockGetImageData = jest.fn().mockImplementation(function () {
                        throw new Error('Context error');
                    });
                    mockContext.getImageData = mockGetImageData;
                    return [4 /*yield*/, expect((0, index_1.getPixelData)({
                            expo2dContext: mockContext,
                            source: {
                                asset: mockAsset,
                                width: 100,
                                height: 100
                            }
                        })).rejects.toThrow('Failed to process pixel data: Context error')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
