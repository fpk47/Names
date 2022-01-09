import { createStore } from 'redux';
import { generalReducer } from './reducer';

const configureStore = () => createStore(generalReducer);

export { configureStore };
