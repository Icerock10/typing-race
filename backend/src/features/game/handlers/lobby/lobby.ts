import { type DepHandlers } from '../../libs/types/types.js';
import { type ChatHandler } from '../chat/chat-handler.module.js';
import { LobbyHandler } from './lobby-handler.module.js';

const initLobby = (deps: DepHandlers & { chat: ChatHandler }): void => {
    new LobbyHandler(deps);
};

export { initLobby };
