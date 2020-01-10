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
import * as babelCore from 'babel-core';
import { NodePath } from 'babel-traverse';
import { ExportAllDeclaration, ExportNamedDeclaration, ImportDeclaration } from 'babel-types';
import { Transform } from 'stream';
export declare type HasSpecifier = ImportDeclaration | ExportNamedDeclaration | ExportAllDeclaration;
export declare const SpecifierVisitor = "ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration";
export declare class SpecifierProxy {
    protected node: HasSpecifier;
    constructor(node: HasSpecifier);
    value: string;
}
export declare type SpecifierCallback = (specifier: SpecifierProxy) => void;
export declare const collectSpecifiers: (specifierCallback: SpecifierCallback) => {
    inherits: any;
    visitor: {
        [SpecifierVisitor](path: NodePath<babelCore.types.ExportAllDeclaration | babelCore.types.ExportNamedDeclaration | babelCore.types.ImportDeclaration>): void;
    };
};
export declare const pathToBareSpecifiersTransform: (assetsDirectory: string) => Transform;
