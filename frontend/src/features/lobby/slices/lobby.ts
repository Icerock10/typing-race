import { createRoom, joinRoom, leaveRoom } from './actions.js';
import { actions } from './lobby.slice.js';

const allActions = {
    ...actions,
    createRoom,
    joinRoom,
    leaveRoom,
};

export { allActions as actions };
export { reducer } from './lobby.slice.js';
