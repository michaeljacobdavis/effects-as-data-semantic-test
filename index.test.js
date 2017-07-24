const lib = require('./');

describe('lib', () => {
  it('creates an array of tuples describing a function', () => {
    const params = { param: 'abc' };
    const command = { type: 'command' };
    const returns = 123;

    // prettier-ignore
    return expect(
      lib.params(params)
      .calls(command).returns(returns)
      .end(returns)
    ).toEqual([
      [params, command],
      [returns, returns]
    ]);
  });

  it('handles multiple calls within a function', () => {
    const params = { param: 'abc' };
    const command = { type: 'command' };
    const returns = 123;
    const testabc = lib.params(params).calls(command).returns(returns);

    // prettier-ignore
    return expect(
      lib.params(params)
      .calls(command).returns(returns)
      .calls(command).returns(returns)
      .end(returns),
    ).toEqual([
      [params, command],
      [returns, command],
      [returns, returns]
    ]);
  });
});
