import Constants from './GameServerConstants';

/**
* @private
*/
function awaitPlayerMessages(messageClient) {

}

/**
* @private
*/
function awaitGroupMessages(messageClient) {

}

export default class ServerMessageClient extends GameServerClient {
  constructor() {
    super();

    this.playerCallbacks = [];
    this.groupCallbacks = [];

    awaitPlayerMessages(this);
    awaitGroupMessages(this);
  }
  onPlayerMessage(callback) {
    this.playerCallbacks.push(callback);
  }
  onGroupMessage(callback) {
    this.groupCallbacks.push(callback);
  }
}
