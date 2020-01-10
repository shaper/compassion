export interface InstallOptions {
    assetsDirectory: string;
    only: string[];
    ignore: string[];
    evenAsDependency: boolean;
}
export interface PublishOptions {
    distDirectory: string;
    assetsDirectory: string;
    sources: string[];
}
export interface Command {
    name: string;
    options: InstallOptions | PublishOptions;
}
export declare const getCommand: () => Command;
