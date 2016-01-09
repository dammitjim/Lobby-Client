export function streamAction(data) {
  return (dispatch) => {
    dispatch({
      type: 'LOADED_STREAMS',
      value: data
    });
  };
}
