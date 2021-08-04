import { createStore, applyMiddleware } from 'redux';
import combineReducers from 'reduxs/reducers.js';

import promiseMiddleware from './middleware/promiseMiddleware'

let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

export default store;