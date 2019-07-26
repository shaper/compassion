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
const fsExtra = require("fs-extra");
const path_1 = require("path");
const path_2 = require("path");
const util_1 = require("util");
const vfs = require("vinyl-fs");
const asset_stage_js_1 = require("./asset-stage.js");
const bare_specifiers_js_1 = require("./transform/bare-specifiers.js");
const inject_process_module_js_1 = require("./transform/inject-process-module.js");
const path_specifiers_js_1 = require("./transform/path-specifiers.js");
const resolution_markers_js_1 = require("./transform/resolution-markers.js");
const cwd = process.cwd();
const copy = util_1.promisify(fsExtra.copy);
exports.applyEmpathy = (outputFolder, includes, excludes) => __awaiter(this, void 0, void 0, function* () {
    const manifestPath = path_2.join(cwd, 'package.json');
    const manifest = require(manifestPath);
    const { dependencies } = manifest;
    // Compute asset dependencies from package manifest dependencies.
    // If includes are specified, only those packages will be considered.
    // Packages explicitly listed in excludes will not be considered.
    const assetDependencies = Object.keys(dependencies || {}).reduce((assetDependencies, key) => {
        let allowed = true;
        if (includes.length) {
            allowed = includes.indexOf(key) > -1;
        }
        allowed = allowed && excludes.indexOf(key) === -1;
        if (allowed) {
            assetDependencies[key] = dependencies[key];
        }
        return assetDependencies;
    }, {});
    let assetStagePath;
    try {
        assetStagePath = yield asset_stage_js_1.assetStage(assetDependencies);
    }
    catch (error) {
        console.error('Unable to stage assets for specifier conversion');
        console.error(error);
        return;
    }
    try {
        yield new Promise((resolve, reject) => {
            vfs.src([`${assetStagePath}${path_1.sep}**${path_1.sep}*.js`], { cwd: assetStagePath })
                .pipe(inject_process_module_js_1.injectProcessModuleTransform())
                .on('error', reject)
                .pipe(resolution_markers_js_1.resolutionMarkerTransform(assetStagePath))
                .on('error', reject)
                .pipe(bare_specifiers_js_1.bareToPathSpecifiersTransform())
                .on('error', reject)
                .pipe(vfs.dest(assetStagePath))
                .on('error', reject)
                .on('end', () => resolve());
        });
        console.log('Empathy applied!');
    }
    catch (error) {
        console.error('Failed to transform asset specifiers');
        console.error(error);
    }
    try {
        yield copy(assetStagePath, path_1.resolve(outputFolder));
    }
    catch (error) {
        console.error('Failed to create assets directory');
        console.error(error);
    }
});
exports.reverseEmpathy = (globs, assetsFolder, outputFolder) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield new Promise((resolve, reject) => {
            vfs.src(globs, { cwd })
                .pipe(path_specifiers_js_1.pathToBareSpecifiersTransform(assetsFolder))
                .on('error', reject)
                .pipe(vfs.dest(outputFolder))
                .on('error', reject)
                .on('end', () => resolve());
        });
    }
    catch (error) {
        console.error('Failed to transform source specifiers');
        console.error(error);
    }
});
//# sourceMappingURL=empathy.js.map