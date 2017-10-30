const io = require('socket.io')();
const clone = require('clone');

const addPlayerReducer = require('./reducers/addPlayerReducer');
const Constants = require('./src/GameServerConstants');
const getDefaultSharedGameState = require('./src/getDefaultSharedGameState');
const nextActionReducer = require('./reducers/nextActionReducer');
const uiActionReducer = require('./reducers/uiActionReducer');
const bootPlayerReducer = require('./reducers/bootPlayerReducer');

// TODO: Account for concurrent games
const gameState = getDefaultSharedGameState();

function reducer(state, action, client) {
  let newState = clone(state);

  newState = addPlayerReducer(newState, action, client);
  newState = nextActionReducer(newState, action, client);

  switch(action.type) {
    case Constants.UI_ACTION:
      newState = uiActionReducer(state, action, client);
    break;
    case Constants.BOOT_PLAYER:
      newState = bootPlayerReducer(state, action, client);
    break;
  }

  return newState;
}

io.on('connection', function(client){
  // Share the game state with the client when the app loads

  //client.emit(Constants.BROADCAST_STATE, gameState);
  io.sockets.emit(Constants.BROADCAST_STATE, gameState);

  // Share updated state when any player action occurs
  client.on(Constants.PUBLISH_ACTION, action => {
    const newState = reducer(gameState, action, client);
    Object.assign(gameState, newState);

    //client.emit(Constants.BROADCAST_STATE, gameState);
    io.sockets.emit(Constants.BROADCAST_STATE, gameState);
  });
});

io.listen(Constants.WEBSOCKET_PORT);
console.log(`Listening on port ${Constants.WEBSOCKET_PORT}`);
