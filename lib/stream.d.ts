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
import { Transform } from 'stream';
export declare type AsyncStreamFunction = (stream: Transform, chunk: any, encoding?: string) => Promise<void>;
export declare type StreamOptions = {
    objectMode?: boolean;
};
export declare const asyncThrough: (fn: AsyncStreamFunction, options?: StreamOptions) => Transform;
export declare type DestructureFunction<T> = (structured: T, encoding?: string) => Promise<T[]>;
export declare const destructureStream: <T>(fn: DestructureFunction<T>, options?: StreamOptions) => Transform;
export declare type TransformFunction<T, U = T> = (source: T, encoding?: string) => Promise<U>;
export declare const transformStream: <T, U = T>(fn: TransformFunction<T, U>, options?: StreamOptions) => Transform;
