module.exports = (callChain, tuple, value) => {
  tuple.push(value);
  return callChain;
};
