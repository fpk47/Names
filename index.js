import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name } from './app.json';

import { configureStore } from './redux/store';

const store = configureStore();

function ReduxWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(name, () => ReduxWrapper);
