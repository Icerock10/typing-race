import { type Server as SocketServer, type Socket as TSocket } from 'socket.io';
import { type GameStore } from '../../store/base-game-store.module.js';
import { type UserService } from '~/features/users/user.service.js';

type DepHandlers = {
    socket: TSocket;
    io: SocketServer;
    store: GameStore;
    userService: UserService;
};

export { type DepHandlers };
