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
const path_1 = require("path");
const util_1 = require("util");
const file_js_1 = require("./file.js");
const findRoot = require('find-root');
const readFile = util_1.promisify(fs.readFile);
exports.ensureDirectoryWithinPath = (path) => (directory) => {
    const relativePath = path_1.relative(path, directory);
    return !!(relativePath && !relativePath.startsWith('.'));
};
exports.ensureManifestWithinPath = (path) => {
    const testDirectory = exports.ensureDirectoryWithinPath(path);
    return (directory) => {
        return testDirectory && fs.existsSync(path_1.join(directory, 'package.json'));
    };
};
exports.detectBareSpecifierForPath = (filePath, searchWithinPath = process.cwd()) => __awaiter(this, void 0, void 0, function* () {
    const rootPath = findRoot(filePath, exports.ensureManifestWithinPath(searchWithinPath));
    const manifestPath = path_1.join(rootPath, 'package.json');
    const manifest = JSON.parse((yield readFile(manifestPath)).toString());
    const { name: packageName } = manifest;
    const packageRelativeFilePath = path_1.relative(rootPath, filePath);
    const fileExtensionRe = new RegExp(`${path_1.extname(filePath)}$`);
    const modulePath = packageRelativeFilePath.replace(fileExtensionRe, '');
    return path_1.join(packageName, modulePath);
});
const bareSpecifierMarkerRe = /\/\/\/[ ]*BareSpecifier=(.*)/;
exports.detectBareSpecifierForFile = (file, searchWithinPath) => __awaiter(this, void 0, void 0, function* () {
    try {
        return exports.detectBareSpecifierForPath(file.path, searchWithinPath);
    }
    catch (error) {
        console.warn(error);
    }
    try {
        const scriptSource = yield file_js_1.getFileContents(file);
        // TODO(cdata): This should be a more sophisticated search, but cheap
        // tricks will work for now:
        const markerMatch = scriptSource.match(bareSpecifierMarkerRe);
        if (markerMatch != null) {
            return markerMatch[1];
        }
    }
    catch (error) {
        console.warn(error);
    }
    throw new Error(`Unable to detect specifier for ${file.path}`);
});
//# sourceMappingURL=specifier.js.map