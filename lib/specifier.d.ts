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
import * as File from 'vinyl';
export declare const ensureDirectoryWithinPath: (path: string) => (directory: string) => boolean;
export declare const ensureManifestWithinPath: (path: string) => (directory: string) => boolean;
export declare const detectBareSpecifierForPath: (filePath: string, searchWithinPath?: string) => Promise<string>;
export declare const detectBareSpecifierForFile: (file: File, searchWithinPath: string) => Promise<string>;
