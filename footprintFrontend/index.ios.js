"use strict";

import Expo from 'expo'; // Development

import React from 'react';
import { AppRegistry,} from 'react-native';

import App from './App';
const FootPrintIOS = () => {
  return (
    <App />
  );
}

AppRegistry.registerComponent('footprintFrontend', () => FootPrintIOS);
AppRegistry.registerComponent('main', () => FootPrintIOS); // Development only
