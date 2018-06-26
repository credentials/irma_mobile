// Update all sessions in the unsatisfiableRequest state on success of a session 
export default store => next => action => {
  const result = next(action);

  if (action.type === 'IrmaSession.Success') {
    var storeState = store.getState();
    for (var sessionId in storeState.sessions) {
      var session = storeState.sessions[sessionId];
      if (typeof session !== 'object') continue;
      if (session.status === 'unsatisfiableRequest') {
        sessionId = Number(sessionId);
        store.dispatch({
          type: 'IrmaBridge.RetryUnsatisfiable',
          sessionId
        });
      }
    }
  }

  return result;
};
