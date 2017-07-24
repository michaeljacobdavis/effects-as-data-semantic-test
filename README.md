Based on https://github.com/orourkedd/effects-as-data#usage:

Given this function:

```js
const { actions, isFailure } = require('effects-as-data/node')
const { pluck } = require('ramda')
const getListOfNames = pluck(['name'])

const saveRepositories = function * (filename) {
  const {payload: username} = yield actions.prompt('\nEnter a github username: ')
  const repos = yield actions.httpGet(`https://api.github.com/users/${username}/repos`)
  const names = getListOfNames(repos.payload)
  yield actions.logInfo(names.join('\n'))
  return names
}

module.exports = {
  saveRepositories
}
```

#### The `effects-as-data` test would look like:

```js
it('should get repositories and print names', testSaveRepositories(() => {
  const repos = [
    { name: 'foo' },
    { name: 'bar' }
  ]
  return [
    ['repos.json', actions.prompt('\nEnter a github username: ')],
    ['orourkedd', actions.httpGet('https://api.github.com/users/orourkedd/repos')],
    [repos, actions.logInfo('foo\nbar')],
    [null, ['foo', 'bar']]
  ]
}))
```
#### The `effects-as-data-semantic-test` test would look like:

```js
const { args } = require('./effects-as-data-semantic-test');

it('should get repositories and print names', testSaveRepositories(() => {
  const repos = [
    { name: 'foo' },
    { name: 'bar' }
  ]
  return args('repos.json')
    .calls(actions.prompt('\nEnter a github username: ')).returns('orourkedd')
    .calls(actions.httpGet('https://api.github.com/users/orourkedd/repos')).returns(repos)
    .calls(actions.logInfo('foo\nbar')).returns(null)
    .end(['foo', 'bar']);
}))
```

### API

**`args`** is the only function exposed initially. Should be what the functions arguments are.
  Returns `{ calls }`

**`calls`** is the action/command object that is called.
  Returns `{ returns }`

**`returns`** is what the action/command returns. Use `calls` for additional action/command calls or `end` to finish the function.
  Returns `{ calls, end }`

**`end`** what the function returns. Returns the expected array of tuples for ead testing.
