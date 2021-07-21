# Envn
Envn is a zero-dependency module that loads environment variables from a .env file into `process.env`.

### Install
```js
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
  override: false,
  async: false,      // load env variables asynchronous
  debug: false
});
```

# License
MIT
