'use strict';

const [assert, test] = [require('node:assert'), require('node:test')];

test('Node.js dependencies check', () => {
  const dependencies = require('../config/dependencies');
  const { node } = dependencies;
  assert.strictEqual(typeof node, 'object');
  assert.strictEqual(typeof node.fs, 'object');
  assert.strictEqual(typeof node.fs.promises, 'object');
  assert.strictEqual(typeof node.fs.promises.stat, 'function');
  assert.strictEqual(typeof node['timers/promises'], 'object');
  assert.strictEqual(typeof node['timersPromises'], 'object');
  assert.strictEqual(typeof node['async_hooks'], 'object');
  assert.strictEqual(typeof node['asyncHooks'], 'object');
});

test('Core dependencies check', () => {
  const dependencies = require('../config/dependencies');
  const { core } = dependencies;
  assert.strictEqual(typeof core, 'object');
  assert.strictEqual(typeof core.astropack, 'object');
  assert.strictEqual(typeof core.astropack.string, 'object');
  assert.strictEqual(typeof core.astropack.string.jsonParse, 'function');
  assert.strictEqual(typeof core.astrowatch, 'function');
  assert.strictEqual(typeof core.astroctx, 'function');
});
