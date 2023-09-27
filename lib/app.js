'use strict';

const { node, core, npm } = require('../config/dependencies');
const { inheritance } = require('./utils');
const { workerThreads, events } = node;
const { MessageChannel, parentPort, threadId, workerData } = workerThreads;
const { kind, root, path } = workerData;

const appCore = { semaphore: null, wather: null, auth: null, logger: null, console: null };
const modules = { api: null, cert: null, domain: null, schemas: null };
const scripts = { lib: null, bus: null, domain: null, db: null };
const statics = { resources: null, static: null };

function App() {
  this.core = { ...appCore, ...scripts, ...statics, ...modules };
  this.mode = process.env.MODE ?? process.env.NODE_ENV ?? 'production';
  this.config = { kind, root, path };
  this.status = 'initialization';
}

module.exports = new (inheritance(App, events.EventEmitter))();
