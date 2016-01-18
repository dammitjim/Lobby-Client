/**
 * Stores options
 * @param  Object dispatch - redux built in
 * @param  Object getState - redux built in
 * @return Object state    - current application state
 */
export function options(state = { config: {} }, action) {
  console.log('Options reducer was called with state', state, 'and action', action);
  switch (action.type) {
    case 'UPDATE':
      return Object.assign({}, state, {
        config: action.value
      });
    default:
      return state;
  }
}
