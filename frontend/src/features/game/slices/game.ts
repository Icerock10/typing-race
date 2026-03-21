import {
    createRoom,
    joinRoom,
    leaveRoom,
    refreshRoom,
    setReadyStatus,
    initPlayerFinish,
    initChatMessageSend,
    getAllGames,
} from './actions.js';
import { actions } from './game.slice.js';

const allActions = {
    ...actions,
    createRoom,
    joinRoom,
    leaveRoom,
    refreshRoom,
    setReadyStatus,
    initChatMessageSend,
    initPlayerFinish,
    getAllGames,
};

export { allActions as actions };
export { reducer } from './game.slice.js';
