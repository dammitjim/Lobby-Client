/**
 * Stores streams loaded by the api
 * @param  Object dispatch - redux built in
 * @param  Object getState - redux built in
 * @return Object state    - current application state
 */
export function streams(state = { _streams: [] }, action) {
  console.log('reducer was called with state', state, 'and action', action);

  switch (action.type) {
    case 'LOADED_STREAMS':
      return Object.assign({}, state, {
        _streams: action.value
      });
    default:
      return state;
  }
}
