"use strict";
import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './components/HomeScreen';
import PostScreen from './components/PostScreen';
import MapViewScreen from './components/MapViewScreen';
import MapScreen from './components/MapScreen';

const AppNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    MapV: {
      screen: MapScreen
    },
    // Comments: {
    //   screen: CommentsScreen
    // },
    NewPost: {
      screen: PostScreen
    },
  },
  {
    headerMode: 'screen'
  }
);
export default AppNavigator;
