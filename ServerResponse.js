const Constants = require('./src/GameServerConstants');

module.exports = class ServerResponse {
  /**
  * metadata - info about the request, such as game id
  * payload - info specific to request, such as action type and result
  */
  constructor(metadata, payload, client) {
    if (!metadata.gameId) {
      throw new Error('Cannot issue response without valid game ID');
    }

    // Broadcast an event for all members of the specified game
    const eventName = [Constants.SERVER_RESPONSE, metadata.gameId].join(':');

    console.log('emitting ' + eventName);
    /*
    client.emit(eventName, {
      metadata,
      payload
    });
    */
  }
};
