import { LobbyHandler } from './lobby-handler.module.js';
import { RaceHandler } from './race-handler.module.js';
import { ChatHandler } from './chat-handler.module.js';
import { type Server as SocketServer, type Socket as TSocket } from 'socket.io';
import { type GameStore } from '../store/base-game-store.module.js';
import { type UserService } from '~/features/users/user.service.js';

type HandlerDeps = {
    socket: TSocket;
    io: SocketServer;
    store: GameStore;
    userService: UserService;
};

const initHandlers = (deps: HandlerDeps): void => {
    const chat = new ChatHandler(deps);
    new LobbyHandler({ ...deps, chat });
    new RaceHandler(deps);
};

export { initHandlers, type HandlerDeps };
