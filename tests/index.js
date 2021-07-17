const envn = require('../index')

envn({
  path: 'tests/fixtures/.env',
  async: false,
  override: false,
  debug: false
});

console.log('-------------------------------');
console.log(process.env.MISS_DOUBLE_QUOTE_END);