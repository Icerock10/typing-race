import { type GameResultDto } from './game-result-dto.type.js';

type GameDto = {
    id: null | string;
    text: string;
    playersCount: number;
    status: string;
    title: string;
    language: string;
    difficulty: string;
    startedAt: Date | null;
    finishedAt: Date | null;
    winnerUserId: string;
    results: GameResultDto[];
};

export { type GameDto };
