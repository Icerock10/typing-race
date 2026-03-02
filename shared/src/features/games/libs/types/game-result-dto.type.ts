type GameResultDto = {
    userId: string;
    username: string;
    wpm: number;
    accuracy: number;
    place: number;
    finishedAt: Date | null;
    isWinner: boolean;
};

export { type GameResultDto };
