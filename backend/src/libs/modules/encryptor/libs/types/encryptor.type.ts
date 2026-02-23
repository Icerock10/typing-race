import { type EncryptedData } from './encrypted-data.type.js';
import { type EncryptionDataPayload } from './encryption-data-payload.type.js';

type Encryptor = {
    compare({ storedHash, value }: EncryptionDataPayload): Promise<boolean>;
    encrypt(value: string): Promise<EncryptedData>;
};

export { type Encryptor };
