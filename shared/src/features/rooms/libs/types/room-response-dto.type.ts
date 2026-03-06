import { type GameStatus } from '../../../games/libs/enums/enums.js';
import { type ValueOf } from '../../../../libs/types/value-of.type.js';
import { type RoomPayload } from './room-payload-dto.type.js';

type RoomResponseDto = RoomPayload & {
    roomId: string | null;
    players: string[];
    status: ValueOf<typeof GameStatus>;
    countdown?: number;
};

export { type RoomResponseDto };
