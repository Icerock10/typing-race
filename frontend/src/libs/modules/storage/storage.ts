import { BaseStorage } from './base-storage.module.js';

const storage = new BaseStorage(globalThis.localStorage);

export { storage };
export { BaseStorage } from './base-storage.module.js';
export { StorageKey } from './libs/enums/enums.js';
export { type Storage } from './libs/types/types.js';
