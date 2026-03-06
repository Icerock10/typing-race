import { createRoom } from './actions.js';
import { actions } from './lobby.slice.js';

const allActions = {
    ...actions,
    createRoom,
};

export { allActions as actions };
export { reducer } from './lobby.slice.js';
