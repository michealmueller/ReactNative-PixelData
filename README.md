# React Native Pixel Data Example 🎨

A React Native application demonstrating image processing and pixel data manipulation capabilities using Expo and React Native.

## 🚀 Tech Stack

- **Framework**: Expo v52
- **Core**: React Native v0.76.7
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Testing**: Jest

## 📦 Key Dependencies

- `react-native-pixel-jpg`: Image processing
- `expo-gl`: OpenGL rendering
- `react-native-canvas`: Canvas operations
- `react-native-image-picker`: Image selection
- `expo-2d-context`: 2D context operations

## 🏗️ Project Structure

```
├── app/                 # Main application code
│   ├── (tabs)/         # Tab-based navigation
│   └── pixel-data/     # Pixel data processing
├── components/         # Reusable components
├── constants/          # App constants
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── assets/            # Static assets
```

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Run on specific platform:
   ```bash
   # Android
   npx expo run:android
   
   # iOS
   npx expo run:ios
   
   # Web
   npx expo start --web
   ```

## 📱 Features

- Image processing and pixel data extraction
- Canvas-based image manipulation
- Tab-based navigation
- Cross-platform support (Android, iOS, Web)

## 🔍 How It Works

1. Load image onto JS canvas
2. Convert image to Expo asset
3. Set pixel data parameters (expo2dcontext and source)
4. Extract pixel data from canvas GL context
5. Process and display results

## 🧪 Testing

Run tests with:
```bash
npm test
# or
yarn test
```

## 📝 License

This project is private and proprietary.