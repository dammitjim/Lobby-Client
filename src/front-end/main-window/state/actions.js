export function followedStreamsLoadedAction(data) {
  return (dispatch) => {
    dispatch({
      type: 'LOADED_FOLLOWED_STREAMS',
      value: data
    });
  };
}

export function channelStreamsLoadedAction(data) {
  return (dispatch) => {
    dispatch({
      type: 'LOADED_CHANNEL_STREAMS',
      value: data
    });
  };
}

export function gamesLoadedAction(data) {
  return (dispatch) => {
    dispatch({
      type: 'LOADED_GAMES',
      value: data
    });
  };
}

export function viewChangedAction(data) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGED_VIEW',
      value: data
    });
  };
}

export function configSavedAction(data) {
  return (dispatch) => {
    dispatch({
      type: 'CONFIG_SAVED',
      value: data
    });
  };
}

export function configReloadedAction(data) {
  return (dispatch) => {
    dispatch({
      type: 'CONFIG_RELOADED',
      value: data
    });
  };
}

export function reloadingState(data) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_RELOADING_STATE',
      value: data
    });
  };
}
