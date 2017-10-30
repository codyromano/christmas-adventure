const clone = require('clone');
const Constants = require('../src/GameServerConstants');
const nextActionReducer = require('./nextActionReducer');
const uiActionReducer = require('./uiActionReducer');
const bootPlayerReducer = require('./bootPlayerReducer');
const addPlayerReducer = require('./addPlayerReducer');

module.exports = function primaryReducer(state, action, client) {
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
    case Constants.UI_MESSAGE:
      newState = notificationReducer(state, action, client);
    break;
  }

  return newState;
};
