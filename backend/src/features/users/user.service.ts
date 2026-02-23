import { type Encryptor } from '~/libs/modules/encryptor/encryptor.js';

import { type UserDto, type UserSignUpRequestDto } from './libs/types/types.js';
import { type UserRepository } from './user.repository.js';

type Service<T = unknown> = {
    create(payload: T): Promise<T>;
    find(id?: string): Promise<null | T>;
    findByEmail(email: string): Promise<T>;
};

class UserService implements Service {
    private encryptor: Encryptor;
    private userRepository: UserRepository;
    public constructor(userRepository: UserRepository, encryptor: Encryptor) {
        this.userRepository = userRepository;
        this.encryptor = encryptor;
    }

    public async create(payload: UserSignUpRequestDto): Promise<UserDto> {
        const { hash } = await this.encryptor.encrypt(payload.password);

        const user = await this.userRepository.create({
            email: payload.email,
            name: payload.name,
            passwordHash: hash,
        } as UserDto & { passwordHash: string });

        return user;
    }
    public async find(id?: string): Promise<null | UserDto> {
        const item = await this.userRepository.find(id);

        return item ?? null;
    }
    public findByEmail(email: string): Promise<null | UserDto> {
        return this.userRepository.findByEmail(email);
    }
}

export { UserService };
