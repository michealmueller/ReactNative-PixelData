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
exports.ImagePickerComponent = void 0;
var React = require("react");
var react_native_1 = require("react-native");
var ImagePickerModule = require("expo-image-picker");
var ThemedText_1 = require("./ThemedText");
var ImagePickerComponent = function (_a) {
    var onImageSelected = _a.onImageSelected, onError = _a.onError;
    var handlePickImage = function () { return __awaiter(void 0, void 0, void 0, function () {
        var status_1, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, ImagePickerModule.requestMediaLibraryPermissionsAsync()];
                case 1:
                    status_1 = (_a.sent()).status;
                    if (status_1 !== 'granted') {
                        throw new Error('Permission to access media library was denied');
                    }
                    return [4 /*yield*/, ImagePickerModule.launchImageLibraryAsync({
                            mediaTypes: ImagePickerModule.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 1,
                        })];
                case 2:
                    result = _a.sent();
                    if (!result.canceled) {
                        onImageSelected(result);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        onError(error_1);
                    }
                    else {
                        onError(new Error('Failed to pick image'));
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.TouchableOpacity style={styles.button} onPress={handlePickImage}>
      <ThemedText_1.ThemedText type="default">Pick an image</ThemedText_1.ThemedText>
    </react_native_1.TouchableOpacity>);
};
exports.ImagePickerComponent = ImagePickerComponent;
var styles = react_native_1.StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
