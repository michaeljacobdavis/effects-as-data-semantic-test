module.exports = (callChain, tuple, command) => {
  tuple.push(command);
  return {
    returns: value => require('./returns')(callChain, value),
  };
};
