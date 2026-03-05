import { HTTPCode, OpenAuthProvider } from '~/libs/enums/enums.js';
import { type DiscordUserDto } from '~/libs/types/types.js';
import { type Encryptor } from '~/libs/modules/encryptor/encryptor.js';
import { type BaseToken } from '~/libs/modules/token/token.js';
import { type OpenAuthRepository } from '../open-auth/open-auth.repository.js';
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
    openAuthRepository: OpenAuthRepository;
};

class AuthService {
    private encryptor: Encryptor;
    private token: BaseToken;
    private userService: UserService;
    private openAuthRepository: OpenAuthRepository;

    public constructor({
        encryptor,
        token,
        userService,
        openAuthRepository,
    }: Constructor) {
        this.userService = userService;
        this.encryptor = encryptor;
        this.openAuthRepository = openAuthRepository;
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

        const { passwordHash } = user.getPasswordData();

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
        const userDto = user.toObject();
        const newToken = await this.token.generate(userDto.id as string);

        return { token: newToken, user: userDto };
    }

    private buildDiscordAvatar(discordUser: DiscordUserDto): string {
        return discordUser.avatar
            ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
            : '';
    }

    private async resolveUserId(discordUser: DiscordUserDto): Promise<string> {
        const existingUser = await this.userService.findByEmail(
            discordUser.email,
        );

        if (existingUser) {
            const { id } = existingUser.toObject();
            return String(id);
        }

        const newUser = await this.userService.create({
            email: discordUser.email,
            firstName: discordUser.global_name,
            lastName: '',
            userName: discordUser.username,
            avatarUrl: this.buildDiscordAvatar(discordUser),
            password: '',
        });

        return String(newUser.id);
    }

    public async discordSignIn(
        discordUser: DiscordUserDto,
    ): Promise<{ token: string }> {
        const existingOpenAuth = await this.openAuthRepository.find(
            discordUser.id,
        );

        if (existingOpenAuth) {
            const token = await this.token.generate(existingOpenAuth.userId);
            return { token };
        }

        const userId = await this.resolveUserId(discordUser);

        await this.openAuthRepository.create({
            userId,
            providerUserId: discordUser.id,
            provider: OpenAuthProvider.DISCORD,
        });

        const token = await this.token.generate(userId);
        return { token };
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
