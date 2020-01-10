/// <reference types="vinyl" />
import * as File from 'vinyl';
export declare const ensureDirectoryWithinPath: (path: string) => (directory: string) => boolean;
export declare const ensureManifestWithinPath: (path: string) => (directory: string) => boolean;
export declare const detectBareSpecifierForPath: (filePath: string, searchWithinPath?: string) => Promise<string>;
export declare const detectBareSpecifierForFile: (file: File, searchWithinPath: string) => Promise<string>;
