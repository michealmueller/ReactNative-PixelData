# Pixel Data Functionality Demo Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```
   ```bash
   yarn install
   ```

2. Start the app

   ```bash
    npx expo run:android
   ```
   ###### This will build and deploy the app to the emulator by default and your device if connected


## That is it

* once the project builds and deploys to either the emulator or a physical device, the main index page will load. 
* This then loads the image on to the JS canvas
* At which point we set the image as an expo asset then "download" the image. set the pixeldata params expo2dcontext and source members.
* then run getPixelData to extract the pixel data from the canvas GL context and console logs the values.