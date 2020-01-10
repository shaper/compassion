"use strict";
/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
Object.defineProperty(exports, "__esModule", { value: true });
const command_js_1 = require("./command.js");
const command = command_js_1.getCommand();
const logLevels = {
  'error': 0,
  'warn': 1,
  'info': 2,
  'debug': 3
};
class Log {
  constructor() {
    // TODO(shaper): Consider allowing user to specify a particular log
    // level. For now we just have command-line-driven verbose vs. not.
    // this.logLevel = logLevels[level || 'info'];
    this.logLevel = logLevels[command.options.verbose ? 'debug' : 'error'];
    this.prefix = '[compassion]';
  }
  error(message) {
    this._maybeLog('error', console.error, message);
  }
  warn(message) {
    this._maybeLog('warn', console.warn, message);
  }
  info(message) {
    this._maybeLog('info', console.log, message);
  }
  debug(message) {
    this._maybeLog('debug', console.debug, message);
  }
  _maybeLog(level, target, message) {
    if (this.logLevel >= logLevels[level]) {
      target(`${this.prefix}`, message);
    }
  }
}
exports.Log = Log;
