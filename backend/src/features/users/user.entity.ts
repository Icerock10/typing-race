import { type UserDto } from '~/libs/types/types.js';

type UserDtoWithPasswordHash = UserDto & { passwordHash: string };

class UserEntity {
    private email: string;
    private id: null | string;
    private firstName: string;
    private lastName: string;
    private userName: string;
    private avatarUrl: string;
    private passwordHash: string;

    private constructor({
        email,
        id,
        firstName,
        lastName,
        userName,
        passwordHash,
        avatarUrl,
    }: UserDtoWithPasswordHash) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.userName = userName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;
        this.avatarUrl = avatarUrl;
    }

    public static initialize({
        email,
        id,
        firstName,
        lastName,
        userName,
        passwordHash,
        avatarUrl,
    }: UserDtoWithPasswordHash): UserEntity {
        return new UserEntity({
            id,
            email,
            firstName,
            userName,
            lastName,
            passwordHash,
            avatarUrl,
        });
    }

    public static initializeNew(properties: {
        email: string;
        firstName: string;
        passwordHash: string;
        userName: string;
        lastName: string;
        avatarUrl: string;
    }): UserEntity {
        return new UserEntity({
            id: null,
            email: properties.email,
            userName: properties.userName,
            firstName: properties.firstName,
            lastName: properties.lastName,
            passwordHash: properties.passwordHash,
            avatarUrl: properties.avatarUrl,
        });
    }

    public getPasswordData(): Pick<UserDtoWithPasswordHash, 'passwordHash'> {
        return {
            passwordHash: this.passwordHash,
        };
    }

    public toObject(): UserDto {
        return {
            email: this.email,
            userName: this.userName,
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            avatarUrl: this.avatarUrl,
        };
    }
}

export { UserEntity };
