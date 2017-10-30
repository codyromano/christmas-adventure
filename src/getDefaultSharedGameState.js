module.exports = function getDefaultSharedGameState() {
  return {
    santaX: 0,
    santaY: 0,
    // Maps player Ids to the action currently available
    // to each player
    players: {}
  };
};
