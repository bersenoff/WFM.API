export type TFnUpdate = () => Promise<boolean>;
export type TFnCollectDataFiles = () => Promise<boolean>;
export type TFnCopyDataNew = () => Promise<boolean>;
export type TFnCopyNewToSelfControl = () => Promise<boolean>;
export type TFnCopyNewToNewKPI = () => Promise<boolean>;
export type TFnCopyNewToARES = () => Promise<boolean>;