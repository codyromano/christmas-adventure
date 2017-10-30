const clone = require('clone');
const shortid = require('shortid');
const Constants = require('../src/GameServerConstants');
const defaultActions = require('../src/data/initialCharacterActions.json');

module.exports = function nextActionReducer(state, action, client) {
  let newState = clone(state);

  newState.players = newState.players || {};
  for (const [playerId, player] of Object.entries(newState.players)) {

    const { actions } = player;
    if (!Array.isArray(actions) || !actions.length) {
      player.actions = defaultActions[player.firstName];
    }
  }

  //console.log('returned state: ', newState);
  return newState;
};
