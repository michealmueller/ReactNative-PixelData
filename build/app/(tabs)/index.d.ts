import React from 'react';
import { ExpoWebGLRenderingContext } from 'expo-gl';
export default class TabTwoScreen extends React.Component {
    render(): React.JSX.Element;
    _onGLContextCreate: (gl: ExpoWebGLRenderingContext) => Promise<void>;
}
