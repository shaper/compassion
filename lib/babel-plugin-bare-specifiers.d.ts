import { NodePath } from 'babel-traverse';
import { ImportDeclaration, ExportNamedDeclaration, ExportAllDeclaration } from 'babel-types';
/**
 * Rewrites so-called "bare module specifiers" to be web-compatible paths.
 */
export declare const resolveBareSpecifiers: (filePath: string, isComponentRequest: boolean, packageName?: string, componentDir?: string, rootDir?: string) => {
    inherits: any;
    visitor: {
        'ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration'(path: NodePath<ExportAllDeclaration | ExportNamedDeclaration | ImportDeclaration>): void;
    };
};
