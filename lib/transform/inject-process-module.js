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
const File = require("vinyl");
const babel_syntax_plugins_js_1 = require("../babel-syntax-plugins.js");
const file_js_1 = require("../file.js");
const stream_js_1 = require("../stream.js");
const processRe = /process\./;
exports.DeclarationVisitor = 'ClassDeclaration|FunctionDeclaration|VariableDeclarator';
exports.collectTopLevelNames = (nameCallback) => ({
    visitor: {
        [exports.DeclarationVisitor](path) {
            const { node, parent, parentPath } = path;
            if (parent.type === 'Program' ||
                (parentPath.parent.type === 'Program' &&
                    parent.type === 'VariableDeclaration')) {
                nameCallback(node.id.name);
            }
        }
    }
});
exports.injectProcessModuleTransform = () => {
    let processModuleFile = null;
    return stream_js_1.destructureStream((file) => __awaiter(this, void 0, void 0, function* () {
        const files = [file];
        const contents = yield file_js_1.getFileContents(file);
        if (processRe.test(contents)) {
            const topLevelNames = [];
            babelCore.transform(contents, {
                plugins: [
                    ...babel_syntax_plugins_js_1.babelSyntaxPlugins,
                    exports.collectTopLevelNames(name => topLevelNames.push(name))
                ]
            });
            if (topLevelNames.indexOf('process') === -1) {
                if (processModuleFile == null) {
                    processModuleFile = new File({
                        cwd: file.cwd,
                        base: file.base,
                        path: `${file.base}/process.js`,
                        contents: Buffer.from(`export const process = { env: { NODE_ENV: 'production' } };`)
                    });
                    files.push(processModuleFile);
                }
                const relativePath = path_1.relative(path_1.dirname(file.path), processModuleFile.path);
                console.log(`Prepending "process" module to ${path_1.relative(file.cwd, file.path)}`);
                file.contents = Buffer.from(`import { process } from '${relativePath}';
${contents}`);
            }
        }
        return files;
    }));
};
//# sourceMappingURL=inject-process-module.js.map