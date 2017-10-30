const clone = require('clone');
const Constants = require('../src/GameServerConstants');

// Maximum # of notices that can exist in the state
const NOTICE_LIMIT = 50;

module.exports = function notificationReducer(
  state, action, client, actionHandler) {

  const newState = clone(state);
  newState.notices = newState.notices || [];

  if (newState.notices.length >= NOTICE_LIMIT) {
    newState.notices.shift();
  }

  newState.notices.push({
    content: action.content,
    time: new Date().getTime()
  });

  return newState;
};
