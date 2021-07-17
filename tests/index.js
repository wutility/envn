const envn = require('../index')

envn({
  path: 'tests/fixtures/.env',
  async: false,
  override: false,
  debug: true
});

console.log(process.env.SENTENCE);