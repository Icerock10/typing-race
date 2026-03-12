import { HandlerParameterIndexes } from '~/libs/enums/enums.js';
import { type Player } from '../types/types.js';

const sortPlayersByProgress = (players: Player[]): Player[] => {
    return players.toSorted((aPlayer, bPlayer) => {
        if (!aPlayer.finishedAt && !bPlayer.finishedAt) {
            return Number(bPlayer.progress) - Number(aPlayer.progress);
        }

        if (aPlayer.finishedAt && !bPlayer.finishedAt) {
            return HandlerParameterIndexes.LAST_INDEX;
        }
        if (!aPlayer.finishedAt && bPlayer.finishedAt) {
            return HandlerParameterIndexes.SECOND_PARAM_INDEX;
        }
        return Number(aPlayer.finishedAt) - Number(bPlayer.finishedAt);
    });
};

export { sortPlayersByProgress };
