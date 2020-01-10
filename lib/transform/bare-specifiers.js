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
const babel_plugin_bare_specifiers_js_1 = require("../babel-plugin-bare-specifiers.js");
const babel_syntax_plugins_js_1 = require("../babel-syntax-plugins.js");
const file_js_1 = require("../file.js");
const stream_js_1 = require("../stream.js");
exports.bareToPathSpecifiersTransform = () => stream_js_1.transformStream((file) => __awaiter(this, void 0, void 0, function* () {
    const plugins = [...babel_syntax_plugins_js_1.babelSyntaxPlugins, babel_plugin_bare_specifiers_js_1.resolveBareSpecifiers(file.path, false)];
    const scriptSource = yield file_js_1.getFileContents(file);
    try {
        const pathParts = file.path.split('node_modules/');
        const relativePath = pathParts[1];
        console.log(`Applying empathy to ${relativePath}`);
        const transformedScriptSource = babelCore.transform(scriptSource, { plugins }).code;
        file.contents = Buffer.from(transformedScriptSource);
    }
    catch (error) {
        console.error(`Failed to transform specifiers in ${file.path}`);
        console.error(error);
    }
    return file;
}));
//# sourceMappingURL=bare-specifiers.js.map