# Pixel Data Example

This is a simple example app demonstrating how to use the `@rosievision/pixel-data` package in a React Native application.

## Features

- Pick an image from the device's media library
- Extract pixel data from the selected image
- Display the RGBA values of the first pixel

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Follow the Expo CLI instructions to run the app on your device or simulator.

## Usage

1. Press the "Pick an Image" button
2. Select an image from your device's media library
3. The app will display the RGBA values of the first pixel in the selected image

## Dependencies

- React Native
- Expo
- @rosievision/pixel-data
- expo-image-picker
- expo-asset
- expo-2d-context

## Notes

- The app requires permission to access the device's media library
- Images are automatically resized to a square aspect ratio for consistency
- Error handling is implemented for common failure cases 