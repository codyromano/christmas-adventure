const io = require('socket.io')();
module.exports = io;


const clone = require('clone');
const Constants = require('./src/GameServerConstants');
const getDefaultSharedGameState = require('./src/getDefaultSharedGameState');
const primaryReducer = require('./reducers/primaryReducer');

// TODO: Account for concurrent games
const gameState = getDefaultSharedGameState();

/**
* Process an action published by the client or the server - that is,
* actions dispatched from within a reducer.
*/
function handleAction(client, action) {
  // Update the game state
  const newState = primaryReducer(gameState, action, client, handleAction);
  Object.assign(gameState, newState);

  // Notify all players of the changed state
  io.sockets.emit(Constants.BROADCAST_STATE, gameState);
}

io.on('connection', function(client){
  // Share the game state with the client when the app loads
  io.sockets.emit(Constants.BROADCAST_STATE, gameState);

  // Share updated state when any player action occurs
  client.on(Constants.PUBLISH_ACTION, handleAction.bind(null, client));
});

io.listen(Constants.WEBSOCKET_PORT);
console.log(`Listening on port ${Constants.WEBSOCKET_PORT}`);
