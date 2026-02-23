import { HTTPCode } from '~/libs/enums/enums.js';
import { type Encryptor } from '~/libs/modules/encryptor/encryptor.js';
import { type BaseToken } from '~/libs/modules/token/token.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
    type UserResponseDto,
} from '~/features/users/libs/types/types.js';
import { AuthorizationError } from '~/plugins/authorization/libs/types/types.js';

import { type UserService } from '../users/user.service.js';
import { UserValidationMessage } from './libs/enums/enums.js';

type Constructor = {
    encryptor: Encryptor;
    token: BaseToken;
    userService: UserService;
};

class AuthService {
    private encryptor: Encryptor;
    private token: BaseToken;
    private userService: UserService;
    public constructor({ encryptor, token, userService }: Constructor) {
        this.userService = userService;
        this.encryptor = encryptor;
        this.token = token;
    }

    public async signIn({
        userRequestDto,
    }: {
        planId?: string;
        userRequestDto: UserSignInRequestDto;
    }): Promise<UserResponseDto> {
        const { email, password } = userRequestDto;

        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new AuthorizationError({
                message: UserValidationMessage.USER_NOT_FOUND,
                status: HTTPCode.NOT_FOUND,
            });
        }

        const { passwordHash } = user as unknown as UserSignInRequestDto & {
            passwordHash: string;
        };

        const isPasswordValid = await this.encryptor.compare({
            storedHash: passwordHash,
            value: password,
        });

        if (!isPasswordValid) {
            throw new AuthorizationError({
                message: UserValidationMessage.WRONG_PASSWORD,
                status: HTTPCode.UNAUTHORIZED,
            });
        }

        const newToken = await this.token.generate(user.id as string);

        return { token: newToken, user };
    }

    public async signUp({
        userRequestDto,
    }: {
        userRequestDto: UserSignUpRequestDto;
    }): Promise<UserResponseDto> {
        const existingUserByEmail = await this.userService.findByEmail(
            userRequestDto.email,
        );

        if (existingUserByEmail) {
            throw new AuthorizationError({
                message: UserValidationMessage.EMAIL_ALREADY_EXISTS,
                status: HTTPCode.BAD_REQUEST,
            });
        }

        const userDto = await this.userService.create(userRequestDto);
        const newToken = await this.token.generate(userDto.id as string);

        return { token: newToken, user: userDto };
    }
}

export { AuthService };
