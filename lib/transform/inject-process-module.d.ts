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
import { NodePath } from 'babel-traverse';
import { ClassDeclaration, FunctionDeclaration, VariableDeclarator } from 'babel-types';
import { Transform } from 'stream';
export declare type DeclaresName = ClassDeclaration | FunctionDeclaration | VariableDeclarator;
export declare const DeclarationVisitor = "ClassDeclaration|FunctionDeclaration|VariableDeclarator";
export declare type NameCallback = (name: string) => void;
export declare const collectTopLevelNames: (nameCallback: NameCallback) => {
    visitor: {
        [DeclarationVisitor](path: NodePath<DeclaresName>): void;
    };
};
export declare const injectProcessModuleTransform: () => Transform;
