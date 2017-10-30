module.exports = function generateUniqueId() {
  return [
    Math.random() * 1000000,
    new Date().getTime()
  ].join('');
};
