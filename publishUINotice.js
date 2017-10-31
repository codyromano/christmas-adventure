const io = require('./websocketServer');
const Constants = require('./src/GameServerConstants');

module.exports = function publishUINotice(content) {
  console.log(`Emitting ${content}`);
  
  io.sockets.emit(Constants.UI_MESSAGE, {
    content,
    time: new Date().getTime()
  });
};
