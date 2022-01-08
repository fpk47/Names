import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name } from './app.json';
import { Provider } from 'react-redux';

import { configureStore } from './redux/store'

const store = configureStore()

const ReduxWrapper = () => (
  <Provider store = { store }>
    <App />
  </Provider>
)

AppRegistry.registerComponent(name, () => ReduxWrapper);