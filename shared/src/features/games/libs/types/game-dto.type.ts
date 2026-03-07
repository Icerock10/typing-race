import { type GameResultDto } from './game-result-dto.type.js';
import { type ValueOf } from '../../../../libs/types/value-of.type.js';
import {
    type GameLanguage,
    type GameStatus,
    type GamesDifficulty,
} from '../enums/enums.js';

type GameDto = {
    id: null | string;
    text: string;
    playersCount: number;
    status: ValueOf<typeof GameStatus>;
    title: string;
    language: ValueOf<typeof GameLanguage>;
    difficulty: ValueOf<typeof GamesDifficulty>;
    startedAt: Date | null;
    finishedAt: Date | null;
    winnerUserId: string;
    results: GameResultDto[];
};

export { type GameDto };
