// Constants for game server actions shared between client and server
module.exports = {
  ROUTE_CHARACTER_INFO: '/confirm-character',
  ROUTE_ARENA: '/arena',
  ACTION_ADD_PLAYER: 'ADD_PLAYER',
  PUBLISH_ACTION: 'publishAction',
  BROADCAST_STATE: 'broadcastState',
  UI_MESSAGE: 'serverHasMessageForClientToDisplay',
  UI_ACTION: 'inGamePlayerUIAction',
  BOOT_PLAYER: 'bootPlayer',
  // Share state only with the publisher of a request
  BROADCAST_CLIENT_STATE: 'broadcastClientState',
  WEBSOCKET_PORT: 8888,
  //WEBSOCKET_URL: 'http://192.168.0.14'
  WEBSOCKET_URL: 'http://localhost'
};
