import {
    createRoom,
    joinRoom,
    leaveRoom,
    refreshRoom,
    setReadyStatus,
} from './actions.js';
import { actions } from './game.slice.js';

const allActions = {
    ...actions,
    createRoom,
    joinRoom,
    leaveRoom,
    refreshRoom,
    setReadyStatus,
};

export { allActions as actions };
export { reducer } from './game.slice.js';
