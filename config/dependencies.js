'use strict';

const { string: pack } = require('astropack');

const NET = ['dns', 'net', 'tls', 'http', 'https', 'http2', 'dgram'];
const SYSTEM = ['util', 'buffer', 'child_process', 'os', 'v8', 'vm', 'worker_threads'];
const STREAM = ['stream', 'fs', 'crypto', 'zlib', 'readline'];
const ASYNC = ['perf_hooks', 'async_hooks', 'timers', 'events', 'timers/promises'];
const TOOLS = ['path', 'string_decoder', 'querystring'];
const TESTS = ['assert', 'test'];

const INTERNAL = [...SYSTEM, ...TOOLS, ...STREAM, ...ASYNC, ...NET, ...TESTS];
const CORE = ['astroctx', 'astrowatch', 'astropack'];

const [loaded, errors] = [{ node: {}, core: {} }, new Set()];

const assign = (type, name, module) => {
  const key = name.startsWith('@') ? name.slice(1) : name;
  const camelKey = pack.case.spinalToCamel(key.replace(/[/_]/g, '-'));
  [loaded[type][name], loaded[type][camelKey]] = [module, module];
};

for (const name of INTERNAL) assign('node', name, require(`node:${name}`));
for (const name of CORE) assign('core', name, require(name));

module.exports = { ...loaded, errors };
Object.freeze(module.exports.node), Object.freeze(module.exports.core);
Object.freeze(module.exports.npm);
