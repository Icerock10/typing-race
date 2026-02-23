import { type UserDto } from './user-dto.type.js';

type UserResponseDto = {
    token: string;
    user: UserDto;
};

export { type UserResponseDto };
