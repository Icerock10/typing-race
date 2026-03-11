import { type RoomResponseDto, type UserDto } from '~/libs/types/types.js';

type Player = {
    socketId: string;
    user: UserDto;
    isReady?: boolean;
    wpm?: number;
    progress?: number;
    accuracy?: number;
    errors?: number;
};

type InternalRoom = Omit<RoomResponseDto, 'players'> & {
    players: Map<string, Player>;
};

export { type InternalRoom, type Player };

export { type RoomResponseDto, type UserDto } from '~/libs/types/types.js';
