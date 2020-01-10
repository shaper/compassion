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
const childProcess = require("child_process");
const fs = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const util_1 = require("util");
const mkdtemp = util_1.promisify(fs.mkdtemp);
const writeFile = util_1.promisify(fs.writeFile);
const exec = util_1.promisify(childProcess.exec);
exports.assetStage = (config) => __awaiter(this, void 0, void 0, function* () {
    const folder = yield mkdtemp(path_1.join(os_1.tmpdir(), 'asset_stage'));
    console.log(`Staging asset dependencies at ${folder}`);
    const manifest = { name: 'asset-stage', dependencies: config };
    const manifestPath = path_1.join(folder, 'package.json');
    console.log('Writing temporary asset manifest...');
    yield writeFile(manifestPath, JSON.stringify(manifest));
    console.log('Installing modules to asset stage...');
    yield exec('npm i', {
        cwd: folder,
    });
    return path_1.join(folder, 'node_modules');
});
//# sourceMappingURL=asset-stage.js.map