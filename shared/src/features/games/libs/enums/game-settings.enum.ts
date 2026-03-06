const GameLanguage = {
    ENGLISH: 'English',
    DEUTSCH: 'Deutsch',
} as const;

const GamesDifficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
} as const;
const GameStatus = {
    IN_PROGRESS: 'In progress',
    FULL: 'full',
    IN_GAME: 'In game',
    FINISHED: 'finished',
} as const;

export { GameLanguage, GamesDifficulty, GameStatus };
