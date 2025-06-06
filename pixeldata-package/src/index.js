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
exports.PixelDataError = void 0;
exports.getPixelData = getPixelData;
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
function getPixelData(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var width, height, asset, rectangle, imageData, error_1;
        var expo2dContext = _b.expo2dContext, source = _b.source;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    if (!expo2dContext || !source) {
                        throw new PixelDataError('Missing required parameters');
                    }
                    width = source.width, height = source.height, asset = source.asset;
                    if (!width || !height || width <= 0 || height <= 0) {
                        throw new PixelDataError('Invalid dimensions');
                    }
                    return [4 /*yield*/, asset.downloadAsync()
                        // Draw the image with proper parameters
                    ];
                case 1:
                    _c.sent();
                    rectangle = [0, 0, width, height];
                    expo2dContext.drawImage.apply(expo2dContext, __spreadArray([asset], rectangle, false));
                    imageData = expo2dContext.getImageData.apply(expo2dContext, rectangle);
                    if (!(imageData === null || imageData === void 0 ? void 0 : imageData.data)) {
                        throw new PixelDataError('Failed to get image data');
                    }
                    return [2 /*return*/, {
                            asset: asset,
                            width: width,
                            height: height,
                            data: imageData.data
                        }];
                case 2:
                    error_1 = _c.sent();
                    if (error_1 instanceof PixelDataError) {
                        throw error_1;
                    }
                    throw new PixelDataError("Failed to process pixel data: ".concat(error_1 instanceof Error ? error_1.message : 'Unknown error'));
                case 3: return [2 /*return*/];
            }
        });
    });
}
