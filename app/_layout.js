"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
var native_1 = require("@react-navigation/native");
var expo_font_1 = require("expo-font");
var expo_router_1 = require("expo-router");
var SplashScreen = require("expo-splash-screen");
var expo_status_bar_1 = require("expo-status-bar");
var react_1 = require("react");
require("react-native-reanimated");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
var useColorScheme_1 = require("@/hooks/useColorScheme");
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
function RootLayout() {
    var colorScheme = (0, useColorScheme_1.useColorScheme)();
    var _a = (0, expo_font_1.useFonts)({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    }), loaded = _a[0], error = _a[1];
    (0, react_1.useEffect)(function () {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);
    if (error) {
        return (<ErrorBoundary_1.ErrorBoundary>
        <native_1.ThemeProvider value={colorScheme === 'dark' ? native_1.DarkTheme : native_1.DefaultTheme}>
          <expo_router_1.Stack>
            <expo_router_1.Stack.Screen name="+not-found" options={{
                title: 'Error',
                headerShown: true,
            }}/>
          </expo_router_1.Stack>
        </native_1.ThemeProvider>
      </ErrorBoundary_1.ErrorBoundary>);
    }
    if (!loaded) {
        return null;
    }
    return (<ErrorBoundary_1.ErrorBoundary>
      <native_1.ThemeProvider value={colorScheme === 'dark' ? native_1.DarkTheme : native_1.DefaultTheme}>
        <expo_router_1.Stack screenOptions={{
            headerShown: true,
            headerBackTitle: 'Back',
            headerBackTitleVisible: true,
            headerTitleStyle: {
                fontFamily: 'SpaceMono',
            },
        }}>
          <expo_router_1.Stack.Screen name="(tabs)" options={{
            headerShown: false,
            title: 'Pixel Data',
        }}/>
          <expo_router_1.Stack.Screen name="+not-found" options={{
            title: 'Not Found',
            headerShown: true,
        }}/>
        </expo_router_1.Stack>
        <expo_status_bar_1.StatusBar style="auto"/>
      </native_1.ThemeProvider>
    </ErrorBoundary_1.ErrorBoundary>);
}
