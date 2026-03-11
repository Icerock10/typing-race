import { GamesDifficulty, GameLanguage } from '~/libs/enums/enums.js';

const DEFAULT_CREATE_ROOM_VALUES = {
    roomName: '',
    difficulty: GamesDifficulty.EASY,
    maxPlayers: '2',
    language: GameLanguage.ENGLISH,
};

export { DEFAULT_CREATE_ROOM_VALUES };
