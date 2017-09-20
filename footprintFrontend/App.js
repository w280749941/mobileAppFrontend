"use strict";
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppNavigator from './src/AppNavigator';
import myReducer from './src/reducers';

export const store = createStore(
  myReducer,
);
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
export default App;
