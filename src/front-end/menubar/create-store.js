import { createStore, applyMiddleware, combineReducers } from 'redux';

import middleware from './middleware';
import * as reducers from './reducers';

/**
 * Creates the application state store
 * Loads all reducers, combines and applies middlewares
 *
 * @param  Object data - initialization data
 * @return Object - state store
 */
export default function(data) {
  const reducer = combineReducers(reducers);
  const finalCreateStore = applyMiddleware(middleware.log, middleware.thunk)(createStore);
  return finalCreateStore(reducer, data);
}
