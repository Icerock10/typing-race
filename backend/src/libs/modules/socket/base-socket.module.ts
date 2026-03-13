import { type Server } from 'node:http';
import { type GameStore } from '~/features/game/store/base-game-store.module.js';
import { config } from '../config/config.js';
import { type SocketService } from './libs/types/types.js';
import { initHandlers, ConnectionHandler } from '~/features/game/game.js';
import { SocketEvent, SocketNamespace } from './libs/enums/enums.js';
import { type BaseToken } from '../token/base-token.module.js';
import { type UserService } from '~/features/users/user.service.js';
import { type Logger } from '../logger/libs/types/logger.type.js';
import { Server as SocketServer, type Socket as TSocket } from 'socket.io';

type Constructor = {
    logger: Logger;
    userService: UserService;
    store: GameStore;
    tokenService: BaseToken;
};

class Socket implements SocketService {
    private _io!: SocketServer;
    private connectionHandler!: ConnectionHandler;
    private logger: Logger;
    private store: GameStore;
    private userService: UserService;
    private tokenService: BaseToken;

    public get io(): SocketServer {
        return this._io;
    }

    constructor({ logger, store, userService, tokenService }: Constructor) {
        this.logger = logger;
        this.store = store;
        this.userService = userService;
        this.tokenService = tokenService;
    }

    public initializeIo = (server: Server): void => {
        this._io = new SocketServer(server, {
            cors: { origin: config.ENV.APP.CLIENT_DEVELOPMENT_SERVER_URL },
        });
        this.connectionHandler = new ConnectionHandler({
            tokenService: this.tokenService,
            userService: this.userService,
            store: this.store,
            io: this._io,
            logger: this.logger,
        });
        this._io
            .of(SocketNamespace.NOTIFICATION)
            .on(SocketEvent.CONNECTION, (socket) => {
                this.notificationHandler(socket);
            });
        this._io
            .of(SocketNamespace.GAME)
            .on(SocketEvent.CONNECTION, async (socket) => {
                await this.connectionHandler.handleConnect(socket);
                initHandlers({
                    socket,
                    io: this._io,
                    store: this.store,
                    userService: this.userService,
                });
                socket.on(SocketEvent.DISCONNECT, () => {
                    this.connectionHandler.handleDisconnect(socket);
                });
            });
    };

    private notificationHandler = (socket: TSocket): void => {
        socket.on(SocketEvent.NOTIFICATION_JOIN_ROOM, (roomId: string) => {
            void socket.join(roomId);
        });

        socket.on(SocketEvent.NOTIFICATION_LEAVE_ROOM, (roomId: string) => {
            void socket.leave(roomId);
        });
    };
}

export { Socket };
