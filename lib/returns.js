module.exports = (callChain, value) => {
  const tuple = [value];
  callChain.push(tuple);
  return {
    calls: command => require('./calls')(callChain, tuple, command),
    end: value => require('./end')(callChain, tuple, value),
  };
};
