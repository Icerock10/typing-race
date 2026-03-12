import {
    createRoom,
    joinRoom,
    leaveRoom,
    refreshRoom,
    setReadyStatus,
    initPlayerFinish,
} from './actions.js';
import { actions } from './game.slice.js';

const allActions = {
    ...actions,
    createRoom,
    joinRoom,
    leaveRoom,
    refreshRoom,
    setReadyStatus,
    initPlayerFinish,
};

export { allActions as actions };
export { reducer } from './game.slice.js';
