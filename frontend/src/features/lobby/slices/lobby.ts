import { createRoom, joinRoom, leaveRoom, refreshRoom } from './actions.js';
import { actions } from './lobby.slice.js';

const allActions = {
    ...actions,
    createRoom,
    joinRoom,
    leaveRoom,
    refreshRoom,
};

export { allActions as actions };
export { reducer } from './lobby.slice.js';
