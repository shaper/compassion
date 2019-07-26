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
const fs = require("fs");
const nodePath = require("path");
const util_1 = require("util");
const vfs = require("vinyl-fs");
const stat = util_1.promisify(fs.stat);
/**
 * Returns the string contents of a Vinyl File object, waiting for
 * all chunks if the File is a stream.
 *
 * NOTE(cdata): We ripped this out of
 * https://github.com/Polymer/polymer-build/blob/master/src/streams.ts as
 * it is the only thing we really need out of that project.
 */
function getFileContents(file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (file.isBuffer()) {
            return file.contents.toString('utf-8');
        }
        else if (file.isStream()) {
            const stream = file.contents;
            stream.setEncoding('utf-8');
            const contents = [];
            stream.on('data', (chunk) => contents.push(chunk));
            return new Promise((resolve, reject) => {
                stream.on('end', () => resolve(contents.join('')));
                stream.on('error', reject);
            });
        }
        throw new Error(`Unable to get contents of file ${file.path}. ` +
            `It has neither a buffer nor a stream.`);
    });
}
exports.getFileContents = getFileContents;
;
class SyntheticFileMap {
    constructor(basePath, makeTransform) {
        this.basePath = basePath;
        this.makeTransform = makeTransform;
        this.fileMap = new Map();
        this.watcher = null;
        this.watchFilesystem();
    }
    watchFilesystem() {
        if (this.watcher != null) {
            return;
        }
        this.watcher = fs.watch(this.basePath, { recursive: true, persistent: false }, (eventType, filename) => this.onFsEvent(eventType, filename));
    }
    stopWatchingFilesystem() {
        if (this.watcher == null) {
            return;
        }
        this.watcher.close();
    }
    hasFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = this.mappedPath(path);
            if (this.fileMap.has(filePath)) {
                return true;
            }
            try {
                const stats = yield stat(filePath);
                if (!stats.isDirectory()) {
                    return true;
                }
            }
            catch (e) {
            }
            return false;
        });
    }
    readFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = this.mappedPath(path);
            if (this.fileMap.has(filePath)) {
                return this.fileMap.get(filePath);
            }
            return yield new Promise((resolve, reject) => {
                const originalFilename = nodePath.basename(filePath);
                vfs.src([filePath])
                    .pipe(this.makeTransform())
                    .on('error', (error) => {
                    console.error(error);
                    reject(error);
                })
                    .on('data', (file) => {
                    const newFilename = nodePath.basename(file.path);
                    // The new filename of the original module will have `.js`
                    // appended if it originally ended in `.html`. Newly generated
                    // files can be referenced by their suggested paths.
                    const storedName = newFilename === `${originalFilename}.js` ?
                        filePath :
                        file.path;
                    // NOTE(cdata): A transform may emit more than one file here, as
                    // is the case for HTML Modules => JS Modules
                    this.fileMap.set(storedName, file);
                })
                    .on('end', () => {
                    if (this.fileMap.has(filePath)) {
                        resolve(this.fileMap.get(filePath));
                    }
                    else {
                        reject(new Error('Not found!'));
                    }
                });
            });
        });
    }
    mappedPath(path) {
        return nodePath.resolve(nodePath.join(this.basePath, path));
    }
    onFsEvent(_eventType, path) {
        const filePath = this.mappedPath(path);
        if (this.fileMap.has(filePath)) {
            this.fileMap.delete(filePath);
        }
    }
}
exports.SyntheticFileMap = SyntheticFileMap;
//# sourceMappingURL=file.js.map