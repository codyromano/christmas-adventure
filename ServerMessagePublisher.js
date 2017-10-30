const Constants = require('./src/GameServerConstants');

module.exports = class ServerMessagePublisher {
  constructor(io, client) {
    this.io = io;
    this.client = client;
  }
  broadcastToPlayer(playerId, message, duration = 3000) {
    this.client.emit(Constants.MESSAGE_PLAYER, message, duration);
  }
  broadcastToGroup(message, duration = 3000) {
    this.io.sockets.emit(Constants.MESSAGE_GROUP, message, duration);
  }
}
