import openSocket from 'socket.io-client';
import Constants from './GameServerConstants';

// Session status codes
const NEVER_STARTED = 1;
//const CONNECTING = 2;
//const CONNECTED = 3;
const ERROR = 4;

const SESSION_ID = 'XmasGameServerSessionId';

/**
* @this GameServerClient
* @private
*/
function notifySubscribers(callbackArrayName, ...args) {
  this[callbackArrayName].forEach(callback => callback(...args));
}

export default class GameServerClient {
  constructor() {
    this.status = NEVER_STARTED;
    this.sessionId = window.localStorage.getItem(SESSION_ID);

    this.errorSubscribers = [];
    this.playerSubscribers = [];
    this.stateSubscribers = [];

    this.socket = openSocket(
      `${Constants.WEBSOCKET_URL}:${Constants.WEBSOCKET_PORT}`
    );

    this.socket.on(
      'connect_error',
      this.handleError.bind(this)
    );
    this.socket.on(
      Constants.BROADCAST_CLIENT_STATE,
      notifySubscribers.bind(this, 'playerSubscribers')
    );
    this.socket.on(
      Constants.BROADCAST_STATE,
      notifySubscribers.bind(this, 'stateSubscribers')
    );
  }
  logout() {
    if (this.sessionId) {
      this.publishAction({
        type: Constants.BOOT_PLAYER
      });
      this.sessionId = null;
      window.localStorage.removeItem(SESSION_ID);
    }
  }
  isConnected() {
    return ['number', 'string'].includes(typeof this.sessionId);
  }
  handleError(err) {
    this.status = ERROR;
    notifySubscribers.apply(this, ['errorSubscribers', err]);
  }
  onError(callback) {
    this.errorSubscribers.push(callback);
  }
  onPlayerSpecificMessage(callback) {
    this.playerSubscribers.push(callback);
  }
  onSharedStateChange(callback) {
    this.stateSubscribers.push(callback);
  }
  publishAction(action) {
    if (!this.isConnected) {
      console.error('You must connect before publishing actions.');
      return false;
    }
    // Assign metadata needed by the server
    Object.assign(action, {
      sessionId: this.sessionId
    });
    this.socket.emit(Constants.PUBLISH_ACTION, action);
  }

  connect(characterFirstName) {
    // Request a role in the game
    return new Promise(resolve => {
      this.publishAction({
        type: Constants.ACTION_ADD_PLAYER,
        firstName: characterFirstName,
        sessionId: this.sessionId
      });
      this.onPlayerSpecificMessage(resp => {
        if (resp.sessionId) {
          this.sessionId = resp.sessionId;
          window.localStorage.setItem(SESSION_ID, this.sessionId);
          resolve(resp);
        } else {
          throw new Error('Server must return sessionId');
        }
      });
    });
  }
  reconnect(sessionId) {
  }
}
