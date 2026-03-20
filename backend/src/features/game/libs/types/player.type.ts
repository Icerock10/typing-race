import { type UserDto } from '~/libs/types/types.js';

type Player = {
    socketId: string;
    user: UserDto;
    isReady?: boolean;
    wpm?: number;
    progress?: number;
    accuracy?: number;
    errors?: number;
    isTyping?: boolean;
    isWinner?: boolean;
    playerRacePosition?: number;
    finishedAt?: number;
};

export { type Player };
