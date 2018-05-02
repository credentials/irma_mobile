// require('babel-polyfill');
// const detox = require('detox');
// const config = require('../package.json').detox;
//
// before(async () => {
//   await detox.init(config);
// });
//
// after(async () => {
//   await detox.cleanup();
// });

const detox = require('detox');
const config = require('../package.json').detox;

// Set the default timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

beforeAll(async () => {
  await detox.init(config, {launchApp: false});
  await device.launchApp({permissions: {camera: 'YES'}});
});

afterAll(async () => {
  await detox.cleanup();
});
