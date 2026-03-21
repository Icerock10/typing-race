import { BaseRepository } from '~/libs/modules/database/database.js';
import { type ReturnModelType } from '@typegoose/typegoose';
import { type OpenAuth as OpenAuthModel } from './open-auth.model.js';
import { type Repository } from '~/libs/types/types.js';

type OpenAuthUser = {
    userId: string;
    provider: string;
    providerUserId: string;
};

class OpenAuthRepository
    extends BaseRepository<typeof OpenAuthModel>
    implements Omit<Repository<OpenAuthUser>, 'findByEmail'>
{
    public constructor(openAuthModel: ReturnModelType<typeof OpenAuthModel>) {
        super(openAuthModel);
    }

    public create(entity: OpenAuthUser): Promise<OpenAuthUser> {
        return super.createDocument(entity);
    }
    public async find(discordId: string): Promise<OpenAuthUser | null> {
        const userDocument = await this.model.findOne({
            providerUserId: discordId,
        });

        return userDocument ?? null;
    }
}

export { OpenAuthRepository };
