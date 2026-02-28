import { encryptor } from '~/libs/modules/encryptor/encryptor.js';
import { userModel } from '~/features/users/user.model.js';

const addUserSeeds = async (): Promise<void> => {
    try {
        await userModel.deleteMany({});

        const userSeeds: { passwordHash: string }[] = [];

        const seedsWithPasswordHash = [];

        for (const seed of userSeeds) {
            const { hash } = await encryptor.encrypt(seed.passwordHash);
            seedsWithPasswordHash.push({ ...seed, passwordHash: hash });
        }

        await userModel.insertMany(seedsWithPasswordHash);
    } catch {
        throw new Error('Error seeding users:');
    }
};

export { addUserSeeds };
