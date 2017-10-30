const Constants = require('./src/GameServerConstants');
const ServerResponse = require('./ServerResponse');
const generateUniqueId = require('./src/generateUniqueId');
const getDefaultSharedGameState = require('./src/getDefaultSharedGameState');

const sharedStateByGame = {};

function getSharedStateForGame(gameId) {
  if (!gameId) {
    throw new Error('Invalid gameId: ', gameId);
  }
  return sharedStateByGame[gameId] || getDefaultSharedGameState();
}

function publishSharedState(metadata, client) {
  if (!metadata.gameId) {
    throw new Error('Cannot publish shared state w/o game id');
  }
  const state = getSharedStateForGame(metadata.gameId);

  const eventsForGame = [
    Constants.SERVER_RESPONSE,
    metadata.gameId
  ].join(':');

  console.log('emit ' + eventsForGame + ' new state: ', state);
  client.emit(eventsForGame, metadata, state);

  //client.emit(Constants.ACTION_STATE_REQUESTED, 'foo', 'bar');
  //new ServerResponse(metadata, state, client);
}

function assignGameState(metadata, client, reducer) {
  const gameId = metadata.gameId;

  if (!gameId) {
    throw new Error('Cannot assign state because ' +
      'gameId is invalid: ' + gameId);
  }

  let game = sharedStateByGame[gameId];
  if (!game) {
    console.warn('No game exists with ID ' + gameId +
      '. A new game will be created.');
    game = sharedStateByGame[gameId] = getDefaultSharedGameState();
  }

  const newState = reducer(game);

  if (typeof newState === 'object') {
    sharedStateByGame[gameId] = newState;
    publishSharedState(metadata, client);
  } else {
    throw new Error('Reducer did not return a valid object');
  }
}

module.exports = {
  [Constants.ACTION_STATE_REQUESTED]: (metadata, payload, client) => {
    publishSharedState(metadata, client);
  },

  [Constants.ACTION_ROLE_REQUESTED]: (metadata, payload, client) => {

    const newPlayerProfile = {
      playerId: generateUniqueId(),
      firstName: payload.firstName
    };

    new ServerResponse(
      metadata,
      newPlayerProfile,
      client
    );

    assignGameState(metadata, client, state => {
      state.players.push(newPlayerProfile);
      return state;
    });
  }
};
