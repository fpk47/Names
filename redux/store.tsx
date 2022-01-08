import { createStore } from 'redux';
import { generalReducer } from './reducer';

const configureStore = () => {
    return createStore(generalReducer);
}

export { configureStore }