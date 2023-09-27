'use strict';

const { node } = require('../../config/dependencies');
const [{ abortController }, app] = [require('../utils'), require('../app')];
const [handlers, { setup }] = [require('./handlers'), require('./setup')];
const { workerThreads: wt } = node;

process.removeAllListeners('warning'), process.on('warning', abortController(app, 'warning'));
process.on('uncaughtException', abortController(app, 'uncaughtException'));
process.on('unhandledRejection', abortController(app, 'unhandledRejection'));

setup().catch(abortController(app, `Can't start worker ${wt.threadId}`));

wt.parentPort.on('message', async msg => {
  const handler = handlers[msg.name];
  if (handler) handler(msg);
});
