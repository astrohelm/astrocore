'use strict';

const { node } = require('../../config/dependencies');
const app = require('../app');
const { workerThreads: wt } = node;

const invoke = async ({ exclusive, data, port }) => {
  const handler = ''; //TODO: Something with sandbox
  const [{ method, args }, { ctx }] = [data, app];
  if (!handler) return void port.postMessage({ name: 'error', error: new Error('Handler 404') });
  const msg = { name: 'invoke', status: 'done' };

  try {
    const data = await handler(args);
    port.postMessage({ ...msg, data });
  } catch (error) {
    port.postMessage({ name: 'error', error });
  } finally {
    if (exclusive) wt.parentPort.postMessage(msg);
  }
};

const stop = async () => {
  if (app.status === 'finalization') return;
  console.info(`Graceful shutdown in worker ${wt.threadId}`);
  await app.shutdown();
  process.exit(0);
};

module.exports = { stop, invoke };
