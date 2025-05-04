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
var react_native_1 = require("@testing-library/react-native");
var ImagePicker_1 = require("../components/ImagePicker");
var ImagePickerModule = require("expo-image-picker");
// Mock expo-image-picker
jest.mock('expo-image-picker', function () { return ({
    launchImageLibraryAsync: jest.fn(),
    requestMediaLibraryPermissionsAsync: jest.fn(),
    MediaTypeOptions: {
        Images: 'images'
    }
}); });
describe('ImagePicker', function () {
    var mockOnImageSelected = jest.fn();
    var mockOnError = jest.fn();
    beforeEach(function () {
        jest.clearAllMocks();
        ImagePickerModule.requestMediaLibraryPermissionsAsync.mockResolvedValue({
            status: 'granted',
            granted: true,
        });
    });
    it('should render pick image button', function () {
        (0, react_native_1.render)(<ImagePicker_1.ImagePickerComponent onImageSelected={mockOnImageSelected} onError={mockOnError}/>);
        expect(react_native_1.screen.getByText('Pick an image')).toBeTruthy();
    });
    it('should handle permission denied', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ImagePickerModule.requestMediaLibraryPermissionsAsync.mockResolvedValue({
                        status: 'denied',
                        granted: false,
                    });
                    (0, react_native_1.render)(<ImagePicker_1.ImagePickerComponent onImageSelected={mockOnImageSelected} onError={mockOnError}/>);
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_1.fireEvent.press(react_native_1.screen.getByText('Pick an image'))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    expect(mockOnError).toHaveBeenCalledWith(new Error('Permission to access media library was denied'));
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle successful image selection', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockImage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockImage = {
                        canceled: false,
                        assets: [{
                                uri: 'test-uri',
                                width: 100,
                                height: 100,
                            }]
                    };
                    ImagePickerModule.launchImageLibraryAsync.mockResolvedValue(mockImage);
                    (0, react_native_1.render)(<ImagePicker_1.ImagePickerComponent onImageSelected={mockOnImageSelected} onError={mockOnError}/>);
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_1.fireEvent.press(react_native_1.screen.getByText('Pick an image'))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    expect(mockOnImageSelected).toHaveBeenCalledWith(mockImage);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle image picker cancellation', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockCancelledResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockCancelledResult = {
                        canceled: true,
                        assets: null
                    };
                    ImagePickerModule.launchImageLibraryAsync.mockResolvedValue(mockCancelledResult);
                    (0, react_native_1.render)(<ImagePicker_1.ImagePickerComponent onImageSelected={mockOnImageSelected} onError={mockOnError}/>);
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_1.fireEvent.press(react_native_1.screen.getByText('Pick an image'))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    expect(mockOnImageSelected).not.toHaveBeenCalled();
                    expect(mockOnError).not.toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should handle image picker error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = new Error('Test error');
                    ImagePickerModule.launchImageLibraryAsync.mockRejectedValue(error);
                    (0, react_native_1.render)(<ImagePicker_1.ImagePickerComponent onImageSelected={mockOnImageSelected} onError={mockOnError}/>);
                    return [4 /*yield*/, (0, react_native_1.act)(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, react_native_1.fireEvent.press(react_native_1.screen.getByText('Pick an image'))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    expect(mockOnError).toHaveBeenCalledWith(error);
                    return [2 /*return*/];
            }
        });
    }); });
});
