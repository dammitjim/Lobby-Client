/**
 * Stores streams loaded by the api
 * @param  Object dispatch - redux built in
 * @param  Object getState - redux built in
 * @return Object state    - current application state
 */
export function streams(state = { followed: [], channels: [] }, action) {
  console.log('Streams reducer was called with state', state, 'and action', action);

  switch (action.type) {
    case 'LOADED_FOLLOWED_STREAMS':
      return Object.assign({}, state, {
        followed: action.value
      });
    case 'LOADED_CHANNEL_STREAMS':
      return Object.assign({}, state, {
        channels: action.value
      });
    default:
      return state;
  }
}
