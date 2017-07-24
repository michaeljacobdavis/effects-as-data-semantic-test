const lib = require('./');

describe('lib', () => {
  it('creates an array of tuples describing a function', () => {
    const args = { param: 'abc' };
    const command = { type: 'command' };
    const returns = 123;

    // prettier-ignore
    return expect(
      lib.args(args)
      .calls(command).returns(returns)
      .end(returns)
    ).toEqual([
      [args, command],
      [returns, returns]
    ]);
  });

  it('handles multiple calls within a function', () => {
    const args = { param: 'abc' };
    const command = { type: 'command' };
    const returns = 123;

    // prettier-ignore
    return expect(
      lib.args(args)
      .calls(command).returns(returns)
      .calls(command).returns(returns)
      .end(returns),
    ).toEqual([
      [args, command],
      [returns, command],
      [returns, returns]
    ]);
  });
});
