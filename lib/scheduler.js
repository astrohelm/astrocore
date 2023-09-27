'use strict';

const { node } = require('../config/dependencies');
const { workerThreads: wt } = node;

const task = (action, task = {}) => ({ name: 'task', action, task });

const add = task => {
  const { port1: port, port2 } = new wt.MessageChannel();
  return new Promise(resolve => {
    port2.on('message', ({ id }) => (port2.close(), resolve(id)));
    wt.parentPort.postMessage({ ...task('add', task), port }, [port]);
  });
};

const remove = async id => wt.parentPort.postMessage(task('remove', { id }));
const stop = async (name = '') => wt.parentPort.postMessage(task('stop', { name }));

module.exports = { add, remove, stop };
