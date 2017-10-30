const clone = require('clone');

module.exports = function bootPlayerReducer(state, action) {
    let newState = clone(state);

    if (newState.players[action.sessionId]) {
      delete newState.players[action.sessionId];
      console.log(`Player with id ${action.sessionId} was booted`);
    } else {
      console.log(`Could not boot player with session id ${action.sessionId}`);
    }

    return newState;
};
