'use strict';

const { node } = require('../../config/dependencies');
const { workerThreads: wt } = node;

const setup = async () => {
  console.info(`Application started in worker ${wt.threadId}`);
  wt.parentPort.postMessage({ name: 'started' });
};

module.exports = { setup };
