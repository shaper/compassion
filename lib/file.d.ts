/// <reference types="vinyl" />
/// <reference types="node" />
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
import * as fs from 'fs';
import { Transform } from 'stream';
import * as File from 'vinyl';
/**
 * Returns the string contents of a Vinyl File object, waiting for
 * all chunks if the File is a stream.
 *
 * NOTE(cdata): We ripped this out of
 * https://github.com/Polymer/polymer-build/blob/master/src/streams.ts as
 * it is the only thing we really need out of that project.
 */
export declare function getFileContents(file: File): Promise<string>;
export declare class SyntheticFileMap {
    readonly basePath: string;
    protected makeTransform: () => Transform;
    protected fileMap: Map<string, File>;
    protected watcher: fs.FSWatcher | null;
    constructor(basePath: string, makeTransform: () => Transform);
    watchFilesystem(): void;
    stopWatchingFilesystem(): void;
    hasFile(path: string): Promise<boolean>;
    readFile(path: string): Promise<File>;
    private mappedPath(path);
    private onFsEvent(_eventType, path);
}
