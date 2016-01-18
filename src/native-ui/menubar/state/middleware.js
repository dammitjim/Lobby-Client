export default {

  /**
   * Allows for actions to be passed in as functions
   * @param  Object dispatch - redux built in
   * @param  Object getState - redux built in
   * @return Function        - middleware
   */
  thunk: ({ dispatch, getState }) => {
    return (next) => (action) => {
      return typeof action === 'function' ?
        action(dispatch, getState) :
        next(action);
    };
  },

  /**
   * Logging middleware
   * @param  Object dispatch - redux built in
   * @param  Object getState - redux built in
   * @return Function        - middleware
   */
  log: () => {
    return (next) => (action) => {
      console.log('Action received:', action);
      return next(action);
    };
  },

  /**
   * Skips all following middleware
   * @param  Object dispatch - redux built in
   * @param  Object getState - redux built in
   * @return Function        - middleware
   */
  discard: () => {
    return () => (action) => {
      console.log('Discarding for action:', action);
    };
  }
};
