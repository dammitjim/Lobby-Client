import { createStore, applyMiddleware, combineReducers } from 'redux';

import { streams } from './reducers/streams';
import { options } from './reducers/options';

import middleware from './middleware';

function create(data) {
  const reducer = combineReducers([streams, options]);
  const finalCreateStore = applyMiddleware(middleware.log, middleware.thunk)(createStore);
  return finalCreateStore(reducer, data);
}

const store = create();
export default store;
