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
const babelCore = require("babel-core");
const path_1 = require("path");
const vfs = require("vinyl-fs");
const babel_syntax_plugins_js_1 = require("../babel-syntax-plugins.js");
const file_js_1 = require("../file.js");
const specifier_js_1 = require("../specifier.js");
const stream_js_1 = require("../stream.js");
const exportExtensions = require('babel-plugin-syntax-export-extensions');
exports.SpecifierVisitor = 'ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration';
class SpecifierProxy {
    constructor(node) {
        this.node = node;
    }
    get value() {
        return this.node.source.value;
    }
    set value(value) {
        this.node.source.value = value;
    }
}
exports.SpecifierProxy = SpecifierProxy;
exports.collectSpecifiers = (specifierCallback) => ({
    inherits: exportExtensions,
    visitor: {
        [exports.SpecifierVisitor](path) {
            const { node } = path;
            if (node.source == null) {
                return;
            }
            specifierCallback(new SpecifierProxy(node));
        }
    }
});
exports.pathToBareSpecifiersTransform = (assetsDirectory) => stream_js_1.transformStream((file) => __awaiter(this, void 0, void 0, function* () {
    const cwd = process.cwd();
    const scriptSource = yield file_js_1.getFileContents(file);
    const relativePath = path_1.relative(cwd, file.path);
    const isWithinAssetsFolder = specifier_js_1.ensureDirectoryWithinPath(assetsDirectory);
    try {
        console.log(`Applying reverse empathy to ${relativePath}`);
        const specifiers = [];
        const { ast } = babelCore.transform(scriptSource, {
            plugins: [
                ...babel_syntax_plugins_js_1.babelSyntaxPlugins,
                exports.collectSpecifiers(specifier => specifiers.push(specifier))
            ]
        });
        const fileDirectory = path_1.dirname(file.path);
        for (const specifier of specifiers) {
            const specifierFilePath = path_1.join(fileDirectory, specifier.value);
            if (!isWithinAssetsFolder(specifierFilePath)) {
                continue;
            }
            const originalSpecifier = specifier.value;
            try {
                specifier.value = yield new Promise((resolve, reject) => {
                    vfs.src([specifierFilePath])
                        .on('error', reject)
                        .on('data', (file) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            resolve(yield specifier_js_1.detectBareSpecifierForFile(file, assetsDirectory));
                        }
                        catch (error) {
                            reject(error);
                        }
                    }));
                });
                console.log(`Adjusting specifier '${originalSpecifier}'
  New value: ${specifier.value}`);
            }
            catch (error) {
                console.log(`Failed to adjust specifier '${originalSpecifier}'`);
                console.error(error);
            }
        }
        const transformedScriptSource = babelCore
            .transformFromAst(ast, undefined, { plugins: [...babel_syntax_plugins_js_1.babelSyntaxPlugins] })
            .code;
        file.contents = Buffer.from(transformedScriptSource);
    }
    catch (error) {
        console.error(`Failed to transform specifiers in ${relativePath}`);
        console.error(error);
    }
    return file;
}));
//# sourceMappingURL=path-specifiers.js.map