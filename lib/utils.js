'use strict';

const [{ node }, app] = [require('../config/dependencies'), require('./app')];
const { ERR_INIT } = require('../config/global');
const { util, workerThreads: wt, path } = node;

const absolute = relative => path.join(app.config.path, relative);
const parallel = async (promises, err = ERR_INIT) => {
  const result = await Promise.allSettled(promises);
  const errors = result.filter(({ status }) => status === 'rejected');
  if (errors.length > 0) {
    for (const { reason } of errors) app.core.console.error(reason);
    throw new Error(err);
  }
};

const abortController = type => async error => {
  if (error.name === 'ExperimentalWarning') return;
  console.error(type + ': ' + (error.stack ?? error.message ?? 'no stack trace'));
  if (app.status === 'initialization') {
    console.error(`Intialization failed in worker ${wt.threadId}`);
    await app.shutdown();
    process.exit(0);
  }
};

const inheritance = (source, target) => {
  util.inherits(target, source);
  return new Proxy(target, {
    apply: (Target, _, args) => new Target(...args),
    construct: (Target, args) => {
      const created = new Target(...args);
      source.call(created);
      return created;
    },
  });
};

module.exports = { inheritance, absolute, abortController, parallel };
