/**
 * Stores streams loaded by the api
 * @param  Object dispatch - redux built in
 * @param  Object getState - redux built in
 * @return Object state    - current application state
 */
export function streams(state = { followed: [], channels: [], games: [] }, action) {
  switch (action.type) {
    case 'LOADED_FOLLOWED_STREAMS':
      return Object.assign({}, state, {
        followed: action.value
      });
    case 'LOADED_CHANNEL_STREAMS':
      return Object.assign({}, state, {
        channels: action.value
      });
    case 'LOADED_GAMES':
      return Object.assign({}, state, {
        games: action.value
      });
    default:
      return state;
  }
}

/**
 * Header stores header data for the UI
 * @param  Object state - state to integrate
 * @param  Object action - action data
 * @return Object state - current application state
 */
export function header(state = { header: {} }, action) {
  switch (action.type) {
    case 'CHANGED_VIEW':
      return Object.assign({}, state, {
        header: action.value
      });
    default:
      return state;
  }
}

/**
 * Config stores the application's configuration
 * @param  Object state - state to integrate
 * @param  Object action - action data
 * @return Object state - current application state
 */
export function config(state = { config: {} }, action) {
  switch (action.type) {
    case 'CONFIG_SAVED':
      return Object.assign({}, state, {
        config: action.value
      });
    default:
      return state;
  }
}