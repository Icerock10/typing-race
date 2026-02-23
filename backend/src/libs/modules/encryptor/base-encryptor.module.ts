import { compare, hash } from 'bcrypt';

import {
    type EncryptedData,
    type EncryptionDataPayload,
    type Encryptor,
} from './libs/types/types.js';

type Constructor = {
    saltSize: number;
};

class BaseEncryptor implements Encryptor {
    private readonly saltSize: number;

    public constructor({ saltSize }: Constructor) {
        this.saltSize = saltSize;
    }

    public async compare({
        storedHash,
        value,
    }: EncryptionDataPayload): Promise<boolean> {
        if (!storedHash) {
            return false;
        }

        return await compare(value, storedHash);
    }

    public async encrypt(value: string): Promise<EncryptedData> {
        const hashBuffer = await hash(value, this.saltSize);

        return { hash: hashBuffer };
    }
}

export { BaseEncryptor };
