import {
    type GamesDifficulty,
    type GameLanguage,
} from '../../../games/libs/enums/enums.js';
import { type ValueOf } from '../../../../libs/types/value-of.type.js';

type RoomPayload = {
    roomName: string;
    difficulty: ValueOf<typeof GamesDifficulty>;
    language: ValueOf<typeof GameLanguage>;
    maxPlayers: number;
};

export { type RoomPayload };
