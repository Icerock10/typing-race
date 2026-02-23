import { BaseRepository } from '~/libs/modules/database/database.js';
import { type UserDto, type ReturnModelType } from './libs/types/types.js';
import { type User as UserModel } from './user.model.js';

type Repository<T> = {
    create(payload: T): Promise<T>;
    find(id?: string): Promise<null | T>;
    findByEmail(email: string): Promise<null | T>;
};

class UserRepository
    extends BaseRepository<typeof UserModel>
    implements Repository<UserDto>
{
    public constructor(userModel: ReturnModelType<typeof UserModel>) {
        super(userModel);
    }
    public async create(entity: UserDto): Promise<UserDto> {
        const userDocument = await super.createDocument(entity);
        return userDocument;
    }
    public async find(id?: string): Promise<null | UserDto> {
        const foundUser = await super.findDocumentById(id);

        return foundUser ?? null;
    }
    public async findByEmail(email: string): Promise<null | UserDto> {
        const foundUserByEmail = await this.model.findOne({ email });

        return foundUserByEmail?.toObject() ?? null;
    }
}

export { UserRepository };
