"use strict";
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const through = require("through2");
exports.asyncThrough = (fn, options = {}) => through(Object.assign({ objectMode: true }, options), function (chunk, encoding, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fn(this, chunk, encoding);
        callback();
    });
});
exports.destructureStream = (fn, options) => exports.asyncThrough((stream, chunk, encoding) => __awaiter(this, void 0, void 0, function* () {
    const destructured = yield fn(chunk, encoding);
    for (const chunk of destructured) {
        stream.push(chunk);
    }
}), options);
exports.transformStream = (fn, options) => exports.asyncThrough((stream, chunk, encoding) => __awaiter(this, void 0, void 0, function* () {
    stream.push(yield fn(chunk, encoding));
}), options);
//# sourceMappingURL=stream.js.map