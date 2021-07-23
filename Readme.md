# Envn
💨 Envn is a zero-dependency module that loads environment variables from a .env file into `process.env`.

![Envn](https://badgen.net/bundlephobia/dependency-count/envn) ![Envn](https://badgen.net/npm/v/envn)
![Envn](https://badgen.net/bundlephobia/min/envn) ![Envn](https://badgen.net/bundlephobia/minzip/envn)

# Install
```js
$ npm install envn
// or via Yarn
$ yarn add envn
```

# Usage
```js
const envn = require('envn')
```

# Methods && Examples
```js
envn({
  path: 'fixtures/.env', // default: process.cwd()/.env
  encoding: 'utf8',  
  override: false,    // Override the existance env variable
  async: false,      // Load env variables asynchronous
  debug: false
});
```

# License
MIT
