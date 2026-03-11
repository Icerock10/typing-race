import { type GameStatus } from '../../../games/libs/enums/enums.js';
import { type ValueOf } from '../../../../libs/types/value-of.type.js';
import { type RoomPayload } from './room-payload-dto.type.js';
import { type UserDto } from '../../../users/users.js';

type PlayerDto = UserDto & {
    isReady: boolean;
    wpm?: number;
    progress?: number;
    accuracy?: number;
    errors?: number;
};

type RoomResponseDto = RoomPayload & {
    roomId: string | null;
    players: PlayerDto[];
    status: ValueOf<typeof GameStatus>;
    countdown?: number;
    hostId: string;
};

export { type RoomResponseDto };
