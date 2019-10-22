export type TFnUpdate = () => Promise<boolean>;
export type TFnCollectDataFiles = () => Promise<boolean>;
export type TFnCopyDataNew = () => Promise<boolean>;
export type TFnCopyDataOld = () => Promise<boolean>;
export type TFnHideSheetsNew = () => Promise<boolean>;
export type TFnHideSheetsOld = () => Promise<boolean>;
export type TFnRefreshAndCopyFiles = () => Promise<boolean>;
export type TFnCopyNewToARES = () => Promise<boolean>;