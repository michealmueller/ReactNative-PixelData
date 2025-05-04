import '@testing-library/jest-native';
import { expect } from '@jest/globals';
// Mock React Native's core modules
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
// Mock TurboModuleRegistry first since other mocks depend on it
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => {
    const mockImageLoader = {
        getConstants: () => ({}),
        getSize: jest.fn(),
        getSizeWithHeaders: jest.fn(),
        prefetchImage: jest.fn(),
        queryCache: jest.fn(),
    };
    const mockSettingsManager = {
        settings: {},
        getConstants: () => ({}),
    };
    const mockStatusBarManager = {
        getConstants: () => ({
            HEIGHT: 20,
            DEFAULT_BACKGROUND_COLOR: '#000000',
            DEFAULT_BAR_STYLE: 'default',
        }),
        setColor: jest.fn(),
        setStyle: jest.fn(),
        setHidden: jest.fn(),
        setNetworkActivityIndicatorVisible: jest.fn(),
        setBackgroundColor: jest.fn(),
        setTranslucent: jest.fn(),
    };
    const mockDeviceInfo = {
        getConstants: () => ({
            Dimensions: {
                window: {
                    width: 375,
                    height: 812,
                    scale: 2,
                    fontScale: 1,
                },
                screen: {
                    width: 375,
                    height: 812,
                    scale: 2,
                    fontScale: 1,
                },
            },
            isIPhoneX_deprecated: false,
            isTesting: true,
            reactNativeVersion: {
                major: 0,
                minor: 0,
                patch: 0,
            },
        }),
    };
    const mockDevSettings = {
        getConstants: () => ({
            isDevModeEnabled: true,
            isRemoteDebuggingEnabled: false,
            isHotLoadingEnabled: false,
        }),
        reload: jest.fn(),
        setIsDebuggingRemotely: jest.fn(),
        setHotLoadingEnabled: jest.fn(),
        setLiveReloadEnabled: jest.fn(),
        setProfilingEnabled: jest.fn(),
    };
    const mockAnimatedModule = {
        startOperationBatch: jest.fn(),
        finishOperationBatch: jest.fn(),
        createAnimatedNode: jest.fn(),
        getValue: jest.fn(),
        startListeningToAnimatedNodeValue: jest.fn(),
        stopListeningToAnimatedNodeValue: jest.fn(),
        connectAnimatedNodes: jest.fn(),
        disconnectAnimatedNodes: jest.fn(),
        startAnimatingNode: jest.fn(),
        stopAnimation: jest.fn(),
        setAnimatedNodeValue: jest.fn(),
        setAnimatedNodeOffset: jest.fn(),
        flattenAnimatedNodeOffset: jest.fn(),
        extractAnimatedNodeOffset: jest.fn(),
        connectAnimatedNodeToView: jest.fn(),
        disconnectAnimatedNodeFromView: jest.fn(),
        dropAnimatedNode: jest.fn(),
        addAnimatedEventToView: jest.fn(),
        removeAnimatedEventFromView: jest.fn(),
    };
    const mockKeyboardObserver = {
        addListener: jest.fn(),
        removeListeners: jest.fn(),
    };
    const mockGLView = {
        createContext: jest.fn(),
        destroyContext: jest.fn(),
        getConstants: () => ({}),
    };
    const mockExpoGL = {
        GLView: mockGLView,
        getConstants: () => ({}),
    };
    const mockNetworking = {
        getConstants: () => ({
            responseEncoding: 'base64',
            shouldEnableBatchedSend: true,
        }),
        sendRequest: jest.fn(),
        abortRequest: jest.fn(),
        clearCookies: jest.fn(),
        addListener: jest.fn(),
        removeListeners: jest.fn(),
    };
    return {
        get: (name) => {
            switch (name) {
                case 'ImageLoader':
                    return mockImageLoader;
                case 'SettingsManager':
                    return mockSettingsManager;
                case 'StatusBarManager':
                    return mockStatusBarManager;
                case 'DeviceInfo':
                    return mockDeviceInfo;
                case 'DevSettings':
                    return mockDevSettings;
                case 'NativeAnimatedModule':
                    return mockAnimatedModule;
                case 'KeyboardObserver':
                    return mockKeyboardObserver;
                case 'ExpoGL':
                    return mockExpoGL;
                case 'Networking':
                    return mockNetworking;
                default:
                    return null;
            }
        },
        getEnforcing: (name) => {
            switch (name) {
                case 'ImageLoader':
                    return mockImageLoader;
                case 'SettingsManager':
                    return mockSettingsManager;
                case 'StatusBarManager':
                    return mockStatusBarManager;
                case 'DeviceInfo':
                    return mockDeviceInfo;
                case 'DevSettings':
                    return mockDevSettings;
                case 'NativeAnimatedModule':
                    return mockAnimatedModule;
                case 'KeyboardObserver':
                    return mockKeyboardObserver;
                case 'ExpoGL':
                    return mockExpoGL;
                case 'Networking':
                    return mockNetworking;
                default:
                    throw new Error(`Module ${name} not found`);
            }
        },
    };
});
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'ios',
    select: jest.fn(obj => obj.ios),
}));
// Mock React Native's Dimensions
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
    get: jest.fn(() => ({ width: 375, height: 812 })),
}));
// Mock React Native's EventEmitter
jest.mock('react-native/Libraries/vendor/emitter/EventEmitter', () => {
    return class EventEmitter {
        addListener = jest.fn(() => ({ remove: jest.fn() }));
        removeAllListeners = jest.fn();
        removeSubscription = jest.fn();
        emit = jest.fn();
    };
});
// Mock React Native's NativeEventEmitter
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
    return class NativeEventEmitter {
        addListener = jest.fn(() => ({ remove: jest.fn() }));
        removeAllListeners = jest.fn();
        removeSubscription = jest.fn();
        emit = jest.fn();
    };
});
// Mock React Native's NativeModules
jest.mock('react-native/Libraries/BatchedBridge/NativeModules', () => ({
    UIManager: {
        RCTView: () => ({
            directEventTypes: {},
        }),
    },
    ImageLoader: {
        getConstants: () => ({}),
        getSize: jest.fn(),
        getSizeWithHeaders: jest.fn(),
        prefetchImage: jest.fn(),
        queryCache: jest.fn(),
    },
    ImagePickerManager: {
        launchImageLibrary: jest.fn(),
        launchCamera: jest.fn(),
    },
    SettingsManager: {
        settings: {},
        getConstants: () => ({}),
    },
    KeyboardObserver: {
        addListener: jest.fn(),
        removeListeners: jest.fn(),
        startObserving: jest.fn(),
        stopObserving: jest.fn(),
    },
    NativeAnimatedModule: {
        startOperationBatch: jest.fn(),
        finishOperationBatch: jest.fn(),
        createAnimatedNode: jest.fn(),
        getValue: jest.fn(),
        startListeningToAnimatedNodeValue: jest.fn(),
        stopListeningToAnimatedNodeValue: jest.fn(),
        connectAnimatedNodes: jest.fn(),
        disconnectAnimatedNodes: jest.fn(),
        startAnimatingNode: jest.fn(),
        stopAnimation: jest.fn(),
        setAnimatedNodeValue: jest.fn(),
        setAnimatedNodeOffset: jest.fn(),
        flattenAnimatedNodeOffset: jest.fn(),
        extractAnimatedNodeOffset: jest.fn(),
        connectAnimatedNodeToView: jest.fn(),
        disconnectAnimatedNodeFromView: jest.fn(),
        dropAnimatedNode: jest.fn(),
        addAnimatedEventToView: jest.fn(),
        removeAnimatedEventFromView: jest.fn(),
    },
}));
// Set up global test utilities
global.React = require('react');
global.expect = expect;
// Mock StyleSheet
jest.mock('react-native/Libraries/StyleSheet/StyleSheet', () => ({
    create: styles => styles,
    hairlineWidth: 1,
    absoluteFill: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
    flatten: styles => styles,
}));
// Mock React Native components
jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    const mockComponent = (displayName) => {
        const ComponentMock = jest.fn().mockImplementation(({ children, ...props }) => {
            const createElement = require('react').createElement;
            return createElement(displayName, props, children);
        });
        ComponentMock.displayName = displayName;
        return ComponentMock;
    };
    return {
        ...RN,
        Platform: {
            OS: 'ios',
            select: jest.fn(obj => obj.ios),
        },
        StyleSheet: {
            create: styles => styles,
            hairlineWidth: 1,
            absoluteFill: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
            flatten: styles => styles,
        },
        // Core Components
        View: mockComponent('View'),
        Text: mockComponent('Text'),
        Image: mockComponent('Image'),
        ScrollView: mockComponent('ScrollView'),
        TextInput: mockComponent('TextInput'),
        TouchableOpacity: mockComponent('TouchableOpacity'),
        TouchableHighlight: mockComponent('TouchableHighlight'),
        TouchableWithoutFeedback: mockComponent('TouchableWithoutFeedback'),
        ActivityIndicator: mockComponent('ActivityIndicator'),
        Modal: mockComponent('Modal'),
        SafeAreaView: mockComponent('SafeAreaView'),
        Switch: mockComponent('Switch'),
        Button: mockComponent('Button'),
        FlatList: mockComponent('FlatList'),
        SectionList: mockComponent('SectionList'),
        KeyboardAvoidingView: mockComponent('KeyboardAvoidingView'),
        StatusBar: mockComponent('StatusBar'),
        RefreshControl: mockComponent('RefreshControl'),
        // Native Modules
        NativeModules: {
            ...RN.NativeModules,
            ImageLoader: {
                getConstants: () => ({}),
                getSize: jest.fn(),
                getSizeWithHeaders: jest.fn(),
                prefetchImage: jest.fn(),
                queryCache: jest.fn(),
            },
            ImagePickerManager: {
                launchImageLibrary: jest.fn(),
                launchCamera: jest.fn(),
            },
            SettingsManager: {
                settings: {},
                getConstants: () => ({}),
            },
            KeyboardObserver: {
                addListener: jest.fn(),
                removeListeners: jest.fn(),
                startObserving: jest.fn(),
                stopObserving: jest.fn(),
            },
            NativeAnimatedModule: {
                startOperationBatch: jest.fn(),
                finishOperationBatch: jest.fn(),
                createAnimatedNode: jest.fn(),
                getValue: jest.fn(),
                startListeningToAnimatedNodeValue: jest.fn(),
                stopListeningToAnimatedNodeValue: jest.fn(),
                connectAnimatedNodes: jest.fn(),
                disconnectAnimatedNodes: jest.fn(),
                startAnimatingNode: jest.fn(),
                stopAnimation: jest.fn(),
                setAnimatedNodeValue: jest.fn(),
                setAnimatedNodeOffset: jest.fn(),
                flattenAnimatedNodeOffset: jest.fn(),
                extractAnimatedNodeOffset: jest.fn(),
                connectAnimatedNodeToView: jest.fn(),
                disconnectAnimatedNodeFromView: jest.fn(),
                dropAnimatedNode: jest.fn(),
                addAnimatedEventToView: jest.fn(),
                removeAnimatedEventFromView: jest.fn(),
            },
        },
        // APIs
        Alert: {
            alert: jest.fn(),
        },
        Animated: {
            ...RN.Animated,
            timing: jest.fn(),
            spring: jest.fn(),
            Value: jest.fn(),
            createAnimatedComponent: jest.fn(),
            event: jest.fn(),
        },
        Dimensions: {
            get: jest.fn(() => ({ width: 375, height: 812 })),
        },
        Keyboard: {
            dismiss: jest.fn(),
            addListener: jest.fn(() => ({ remove: jest.fn() })),
            removeListener: jest.fn(),
            scheduleLayoutAnimation: jest.fn(),
            startDetecting: jest.fn(),
            stopDetecting: jest.fn(),
        },
        Linking: {
            openURL: jest.fn(),
            canOpenURL: jest.fn(),
        },
        NetInfo: {
            fetch: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        },
        PermissionsAndroid: {
            request: jest.fn(),
            check: jest.fn(),
        },
        Settings: {
            get: jest.fn(),
            set: jest.fn(),
            watchKeys: jest.fn(),
            clearWatch: jest.fn(),
        },
        // Add Clipboard mock
        Clipboard: {
            setString: jest.fn(),
            getString: jest.fn(),
            hasString: jest.fn(),
            hasURL: jest.fn(),
            hasNumber: jest.fn(),
            hasWebURL: jest.fn(),
        },
    };
});
// Mock React Native Web
jest.mock('react-native-web', () => {
    const mockComponent = (displayName) => {
        const ComponentMock = jest.fn().mockImplementation(({ children, ...props }) => {
            const createElement = require('react').createElement;
            return createElement(displayName, props, children);
        });
        ComponentMock.displayName = displayName;
        return ComponentMock;
    };
    return {
        View: mockComponent('View'),
        Text: mockComponent('Text'),
        Image: mockComponent('Image'),
        TouchableOpacity: mockComponent('TouchableOpacity'),
        ActivityIndicator: mockComponent('ActivityIndicator'),
    };
});
// Mock React DOM
jest.mock('react-dom', () => ({
    render: jest.fn(),
    createPortal: jest.fn(),
}));
// Mock ActivityIndicatorViewNativeComponent
jest.mock('react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent', () => ({
    __INTERNAL_VIEW_CONFIG: {},
}));
// Mock React Native TextInput components
jest.mock('react-native/Libraries/Components/TextInput/RCTInputAccessoryViewNativeComponent', () => ({
    __INTERNAL_VIEW_CONFIG: {},
}));
jest.mock('react-native/Libraries/Components/TextInput/TextInput', () => {
    const mockComponent = (displayName) => {
        const ComponentMock = jest.fn().mockImplementation(({ children, ...props }) => {
            const createElement = require('react').createElement;
            return createElement(displayName, props, children);
        });
        ComponentMock.displayName = displayName;
        return ComponentMock;
    };
    return mockComponent('TextInput');
});
jest.mock('react-native/Libraries/Components/TextInput/TextInputState', () => ({
    currentlyFocusedInput: jest.fn(),
    focusTextInput: jest.fn(),
    blurTextInput: jest.fn(),
}));
// Mock React Native Modal components
jest.mock('react-native/Libraries/Modal/RCTModalHostViewNativeComponent', () => ({
    __INTERNAL_VIEW_CONFIG: {},
}));
jest.mock('react-native/Libraries/Modal/Modal', () => {
    const mockComponent = (displayName) => {
        const ComponentMock = jest.fn().mockImplementation(({ children, ...props }) => {
            const createElement = require('react').createElement;
            return createElement(displayName, props, children);
        });
        ComponentMock.displayName = displayName;
        return ComponentMock;
    };
    return mockComponent('Modal');
});
// Mock React Native SafeAreaView components
jest.mock('react-native/Libraries/Components/SafeAreaView/RCTSafeAreaViewNativeComponent', () => ({
    __INTERNAL_VIEW_CONFIG: {},
}));
jest.mock('react-native/Libraries/Components/SafeAreaView/SafeAreaView', () => {
    const mockComponent = (displayName) => {
        const ComponentMock = jest.fn().mockImplementation(({ children, ...props }) => {
            const createElement = require('react').createElement;
            return createElement(displayName, props, children);
        });
        ComponentMock.displayName = displayName;
        return ComponentMock;
    };
    return mockComponent('SafeAreaView');
});
// Mock React Native ScrollView components
jest.mock('react-native/Libraries/Components/ScrollView/AndroidHorizontalScrollContentViewNativeComponent', () => ({
    __INTERNAL_VIEW_CONFIG: {},
}));
jest.mock('react-native/Libraries/Components/ScrollView/ScrollView', () => {
    const mockComponent = (displayName) => {
        const ComponentMock = jest.fn().mockImplementation(({ children, ...props }) => {
            const createElement = require('react').createElement;
            return createElement(displayName, props, children);
        });
        ComponentMock.displayName = displayName;
        return ComponentMock;
    };
    return mockComponent('ScrollView');
});
// Mock React Native Switch components
jest.mock('react-native/Libraries/Components/Switch/AndroidSwitchNativeComponent', () => ({
    __INTERNAL_VIEW_CONFIG: {},
}));
jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
    const mockComponent = (displayName) => {
        const ComponentMock = jest.fn().mockImplementation(({ children, ...props }) => {
            const createElement = require('react').createElement;
            return createElement(displayName, props, children);
        });
        ComponentMock.displayName = displayName;
        return ComponentMock;
    };
    return mockComponent('Switch');
});
// Mock expo-gl
jest.mock('expo-gl', () => ({
    GLView: jest.fn().mockImplementation(({ onContextCreate }) => {
        const mockContext = {
            drawImage: jest.fn(),
            getImageData: jest.fn().mockReturnValue({
                data: new Uint8ClampedArray([255, 0, 0, 255])
            }),
            apply: jest.fn().mockImplementation(callback => callback())
        };
        onContextCreate(mockContext);
        return null;
    })
}));
// Mock ProgressBarAndroid
jest.mock('react-native/Libraries/Components/ProgressBarAndroid/ProgressBarAndroid', () => {
    return jest.fn().mockImplementation(() => null);
});
