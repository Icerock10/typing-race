import { type RoomResponseDto } from '~/libs/types/types.js';
import { type Player } from './player.type.js';

type InternalRoom = Omit<RoomResponseDto, 'players'> & {
    players: Map<string, Player>;
};

export { type InternalRoom };
