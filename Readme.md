# Envn
Envn is a zero-dependency module that loads environment variables from a .env file into `process.env`.

### Install
```
$ npm install envn
// or via Yarn
$ yarn add envn
```

### Usage
```js
const envn = require('envn')
```

### Methods && Examples
```js
envn({
  path: './fixtures/.env',
  encoding: 'utf8',
  debug: false,
  override: false,
  async: false
});
```