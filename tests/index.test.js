const envn = require('../build/index')

envn({
  path: 'tests/fixtures/.env'
});

test('Not Accepted: MISS_DOUBLE_QUOTE_END=bar" ', () => {
  expect(process.env.MISS_DOUBLE_QUOTE_END).toBeUndefined();
});

test('Not Accepted: EMPTY_VALUE= ', () => {
  expect(process.env.EMPTY_VALUE).toBeUndefined();
});

test('Not Accepted: NULL_VALUE=null ', () => {
  expect(process.env.NULL_VALUE).toBeUndefined();
});

test('Not Accepted: NULL_VALUE=null ', () => {
  expect(process.env.NULL_VALUE).toBeUndefined();
});

test('Not Accepted: &po = io ', () => {
  expect(process.env['&po']).toBeUndefined();
});

test('Accepted: SECRET_KEY=sdsdrtQUioPsd==', () => {
  expect(process.env.SECRET_KEY).toBe('sdsdrtQUioPsd==');
});

test('Accepted: OB_UI={ "name": "hello", "age": 1 }', () => {
  const parsed = JSON.parse(process.env.OB_UI);
  expect(parsed).toEqual({ "name": "hello", "age": 1 });
});

// Loading another file

envn({
  path: 'tests/fixtures/.env.local'
});

test('Accepted: SENTENCE=\'Hi, there!\'', () => {
  expect(process.env.SENTENCE).toBe("Hi, there!");
});