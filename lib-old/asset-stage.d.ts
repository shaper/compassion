export interface AssetStageConfig {
    [index: string]: string;
}
export declare const assetStage: (config: AssetStageConfig) => Promise<string>;
