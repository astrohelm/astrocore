'use strict';

const { core } = require('../config/dependencies');

module.exports = function (name, app) {
  const watcher = app.core.get('watcher');
  const path = app.core.get('utils').absolute(name);

  return async function load(target = path) {
    await core.astropack.fs.dir.ensure(target);
    watcher.watch(target);
    try {
      const core.astroctx.read()
      // TODO: VM loader
    } catch (err) {
      const console = app.console || global.console;
      console.error(err.stack);
    }
  };
};
