const clone = require('clone');

module.exports = function uiActionReducer(state, action, client) {
  let newState = clone(state);
  const player = newState.players[ action.sessionId ];

  const moveDistance = 25;

  switch (action.actionName) {
    case 'Move right':
      player.coords.x+= moveDistance;
    break;
    case 'Move left':
      player.coords.x-= moveDistance;
    break;
    case 'Move down':
      player.coords.y+= moveDistance;
    break;
    case 'Move up':
      player.coords.y-= moveDistance;
    break;
  }

  return newState;
}
