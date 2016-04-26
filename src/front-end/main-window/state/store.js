import { createStore, applyMiddleware, combineReducers } from 'redux';

import middleware from './middleware';
import * as reducers from './reducers';

function create(data) {
  const reducer = combineReducers(reducers);
  const finalCreateStore = applyMiddleware(middleware.thunk)(createStore);
  return finalCreateStore(reducer, data);
}

const store = create();
export default store;
