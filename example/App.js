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
exports.default = App;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_asset_1 = require("expo-asset");
var expo_2d_context_1 = require("expo-2d-context");
var pixel_data_1 = require("@rosievision/pixel-data");
var ImagePicker = require("expo-image-picker");
function App() {
    var _this = this;
    var _a = (0, react_1.useState)(null), pixelData = _a[0], setPixelData = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var handleImagePick = function () { return __awaiter(_this, void 0, void 0, function () {
        var status_1, result, context, asset, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, ImagePicker.requestMediaLibraryPermissionsAsync()];
                case 1:
                    status_1 = (_a.sent()).status;
                    if (status_1 !== 'granted') {
                        setError('Permission to access media library was denied');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [1, 1],
                            quality: 1,
                        })];
                case 2:
                    result = _a.sent();
                    if (!(!result.canceled && result.assets[0])) return [3 /*break*/, 5];
                    context = new expo_2d_context_1.default(1, {
                        maxGradStops: 10,
                        renderWithOffscreenBuffer: false,
                        fastFillTesselation: false
                    });
                    asset = expo_asset_1.Asset.fromURI(result.assets[0].uri);
                    return [4 /*yield*/, asset.downloadAsync()
                        // Get pixel data
                    ];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, pixel_data_1.getPixelData)({
                            expo2dContext: context,
                            source: {
                                asset: asset,
                                width: result.assets[0].width || 100,
                                height: result.assets[0].height || 100
                            }
                        })];
                case 4:
                    data = _a.sent();
                    setPixelData(data.data);
                    setError(null);
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    setError(err_1 instanceof Error ? err_1.message : 'An error occurred');
                    setPixelData(null);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={styles.title}>Pixel Data Example</react_native_1.Text>
      
      <react_native_1.TouchableOpacity style={styles.button} onPress={handleImagePick}>
        <react_native_1.Text style={styles.buttonText}>Pick an Image</react_native_1.Text>
      </react_native_1.TouchableOpacity>

      {error && (<react_native_1.Text style={styles.error}>{error}</react_native_1.Text>)}

      {pixelData && (<react_native_1.View style={styles.resultContainer}>
          <react_native_1.Text style={styles.resultText}>
            First pixel RGBA: [{pixelData[0]}, {pixelData[1]}, {pixelData[2]}, {pixelData[3]}]
          </react_native_1.Text>
        </react_native_1.View>)}
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    error: {
        color: '#FF3B30',
        marginBottom: 20,
    },
    resultContainer: {
        backgroundColor: '#F2F2F7',
        padding: 15,
        borderRadius: 8,
        width: '100%',
    },
    resultText: {
        fontSize: 16,
    },
});
