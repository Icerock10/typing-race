import { createRoom, joinRoom } from './actions.js';
import { actions } from './lobby.slice.js';

const allActions = {
    ...actions,
    createRoom,
    joinRoom,
};

export { allActions as actions };
export { reducer } from './lobby.slice.js';
