import { type Server } from 'node:http';
import { type GameStore } from '~/features/game-state/base-game-store.module.js';
import { LobbyHandler } from '~/features/lobby/lobby-handler.module.js';
import { type SocketService } from './libs/types/types.js';
import { SocketEvent, SocketNamespace } from './libs/enums/enums.js';
import { type Logger } from '../logger/libs/types/logger.type.js';
import { Server as SocketServer, type Socket as TSocket } from 'socket.io';

type Constructor = {
    logger: Logger;
    store: GameStore;
};

class Socket implements SocketService {
    private _io!: SocketServer;
    private logger: Logger;
    private store: GameStore;

    public get io(): SocketServer {
        return this._io;
    }

    constructor({ logger, store }: Constructor) {
        this.logger = logger;
        this.store = store;
    }

    public initializeIo = (server: Server): void => {
        this._io = new SocketServer(server, { cors: { origin: '*' } });
        this._io
            .of(SocketNamespace.NOTIFICATION)
            .on(SocketEvent.CONNECTION, (socket) => {
                this.logger.info(`Socket client connected: ${socket.id}`);
                this.notificationHandler(socket);
            });
        this._io.on(SocketEvent.CONNECTION, (socket) => {
            const token = socket.handshake.auth['token'] as string;
            this.store.addUser(socket.id, { token });

            this.initLobbyHandler(socket);
        });
    };

    private initLobbyHandler = (socket: TSocket): void => {
        new LobbyHandler({
            socket,
            io: this._io,
            store: this.store,
            logger: this.logger,
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
