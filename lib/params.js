module.exports = params => {
  const tuple = [params];
  const callChain = [tuple];
  return {
    calls: command => require('./calls')(callChain, tuple, command),
  };
};
