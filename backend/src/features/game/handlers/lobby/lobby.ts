import { type DepHandlers } from '../../libs/types/types.js';
import { type ChatHandler } from '../chat/chat-handler.module.js';
import { LobbyHandler } from './lobby-handler.module.js';
import { LobbyService } from './lobby-service.module.js';

const initLobby = (deps: DepHandlers & { chat: ChatHandler }): void => {
    const { store, userService, chat, socket, io } = deps;
    const lobbyService = new LobbyService({ store, userService, chat });
    new LobbyHandler({ io, socket, lobbyService });
};

export { initLobby };
