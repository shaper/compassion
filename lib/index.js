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
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const command_js_1 = require("./command.js");
const empathy_js_1 = require("./empathy.js");
const logger = require("./log.js");
const log = new logger.Log();
const command = command_js_1.getCommand();
switch (command.name) {
    case 'install': {
        const { assetsDirectory, only, ignore, evenAsDependency } = command.options;
        const initCwd = process.env['INIT_CWD'];
        const isDependency = initCwd != null && initCwd !== process.cwd();
        const shouldRunInstall = !isDependency || evenAsDependency;
        if (shouldRunInstall) {
            empathy_js_1.applyEmpathy(assetsDirectory, only, ignore)
                .then(() => {
                const prettyOutPath = path_1.relative(process.cwd(), assetsDirectory);
                log.info(`Assets installed to "${prettyOutPath}" 🖖`);
            })
                .catch(error => {
                log.error(error);
            });
        }
        else {
            process.exit(0);
        }
        break;
    }
    case 'publish': {
        const { sources, assetsDirectory, distDirectory } = command.options;
        empathy_js_1.reverseEmpathy(sources, assetsDirectory, distDirectory)
            .then(() => {
            const prettyOutPath = path_1.relative(process.cwd(), distDirectory);
            log.info(`Artifacts with name specifiers placed in "${prettyOutPath}" 🖖`);
        })
            .catch(error => {
            log.error(error);
        });
        break;
    }
}
//# sourceMappingURL=index.js.map
