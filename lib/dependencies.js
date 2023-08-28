'use strict';

const astropack = require('astropack');

const CWD = process.cwd();
const PKG = require(CWD + '/package.json');

const NET = ['dns', 'net', 'tls', 'http', 'https', 'http2', 'dgram'];
const SYSTEM = ['util', 'buffer', 'child_process', 'os', 'v8', 'vm', 'worker_threads'];
const STREAM = ['stream', 'fs', 'crypto', 'zlib', 'readline'];
const ASYNC = ['perf_hooks', 'async_hooks', 'timers', 'events', 'timers/promises'];
const TOOLS = ['path', 'string_decoder', 'querystring'];
const TESTS = ['assert', 'test'];

const INTERNAL = [...SYSTEM, ...TOOLS, ...STREAM, ...ASYNC, ...NET, ...TESTS];
const CORE = ['astroctx', 'astrowatch', 'astropack'];
const NPM = Object.keys(PKG.dependencies);

const DEPENDENCIES = [...INTERNAL, ...NPM, ...CORE];
const [[node, npm, astro], notLoaded] = [[{}, {}, {}], new Set()];

const assign = (pack, name, value) => {
  const key = (name.startsWith('@') ? name.slice(1) : name).replace(/\//g, '-');
  const camel = astropack;
  pack[name] = pack[camel] = value;
};

for (const name of INTERNAL) require(`node:${name}`);

module.exports = {
  node: Object.freeze(node),
  npm: Object.freeze(npm),
  astro: Object.freeze(astro),
  notLoaded,
};
