import { type Encryptor } from '~/libs/modules/encryptor/encryptor.js';
import { UserEntity } from './user.entity.js';
import { type UserDto, type UserSignUpRequestDto } from './libs/types/types.js';
import { type UserRepository } from './user.repository.js';

class UserService {
    private encryptor: Encryptor;
    private userRepository: UserRepository;
    public constructor(userRepository: UserRepository, encryptor: Encryptor) {
        this.userRepository = userRepository;
        this.encryptor = encryptor;
    }

    public async create(payload: UserSignUpRequestDto): Promise<UserDto> {
        const { hash } = await this.encryptor.encrypt(payload.password);

        const user = await this.userRepository.create(
            UserEntity.initializeNew({
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName,
                userName: payload.userName,
                avatarUrl: payload.avatarUrl,
                passwordHash: hash,
            }),
        );

        return user.toObject();
    }
    public async find(id?: string): Promise<null | UserDto> {
        const item = await this.userRepository.find(id);

        return item?.toObject() ?? null;
    }
    public async getAll(): Promise<UserDto[]> {
        const items = await this.userRepository.getAll();

        return items.map((item) => item.toObject());
    }

    public async findByEmail(email: string): Promise<null | UserEntity> {
        const foundUser = await this.userRepository.findByEmail(email);
        return foundUser ?? null;
    }
}

export { UserService };
