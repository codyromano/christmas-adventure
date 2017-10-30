const clone = require('clone');
const shortid = require('shortid');
const Constants = require('../src/GameServerConstants');

module.exports = function addPlayerReducer(state, action, client, actionHandler) {
  let newState = clone(state);

  switch (action.type) {
    case Constants.ACTION_ADD_PLAYER:

      const newPlayer = {
        // Character name: Cait, Cody, etc.
        firstName: action.firstName,
        // Your unique ID in the game
        sessionId: shortid.generate(),
        // Actions available to the player
        actions: [],
        coords: {
          x: 0,
          y: 200
        }
      };

      const existingProfile = newState.players[ action.sessionId ];
      if (existingProfile) {
        console.log(`Resuming session: ${existingProfile.firstName}. id: ${existingProfile.sessionId}`);
        client.emit(Constants.BROADCAST_CLIENT_STATE, existingProfile);
      } else {
        console.log(`New session: ${newPlayer.firstName}. id: ${newPlayer.sessionId}`);
        newState.players[ newPlayer.sessionId ] = newPlayer;
        client.emit(Constants.BROADCAST_CLIENT_STATE, newPlayer);
      }

      actionHandler(client, {
        type: Constants.UI_MESSAGE,
        content: `${action.firstName} joined the game`
      });
    break;
  }

  return newState;
};
