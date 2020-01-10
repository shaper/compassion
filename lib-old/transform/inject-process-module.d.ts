/// <reference types="node" />
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
