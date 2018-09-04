const {ERRORS} = require('./types');

export const clearError = () => {
  return dispatch => {
      dispatch({ type: ERRORS, payload: undefined})
  }
};
