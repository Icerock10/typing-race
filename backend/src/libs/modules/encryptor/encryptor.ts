import { BaseEncryptor } from './base-encryptor.module.js';

const SALT_SIZE = 10;

const encryptor = new BaseEncryptor({ saltSize: SALT_SIZE });

export { encryptor };
export {
    type EncryptedData,
    type EncryptionDataPayload,
    type Encryptor,
} from './libs/types/types.js';
