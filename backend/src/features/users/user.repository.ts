import { BaseRepository } from '~/libs/modules/database/database.js';
import { type ReturnModelType } from './libs/types/types.js';
import { UserEntity } from './user.entity.js';
import { type User as UserModel } from './user.model.js';
import { type Repository } from '~/libs/types/repository.type.js';

class UserRepository
    extends BaseRepository<typeof UserModel>
    implements Repository<UserEntity>
{
    public constructor(userModel: ReturnModelType<typeof UserModel>) {
        super(userModel);
    }

    public async create(entity: UserEntity): Promise<UserEntity> {
        const userDocument = await super.createDocument(entity);
        return UserEntity.initialize(userDocument);
    }
    public async find(id?: string): Promise<null | UserEntity> {
        const foundUser = await super.findDocumentById(id);

        return foundUser ? UserEntity.initialize(foundUser) : null;
    }
    public async findByEmail(email: string): Promise<null | UserEntity> {
        const foundUserByEmail = await this.model.findOne({ email });

        return foundUserByEmail
            ? UserEntity.initialize(foundUserByEmail)
            : null;
    }
}

export { UserRepository };
