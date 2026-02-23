import { type Server } from 'node:http';
import { type SocketService } from './libs/types/types.js';
import { SocketEvent, SocketNamespace } from './libs/enums/enums.js';
import { type Logger } from '../logger/libs/types/logger.type.js';
import { Server as SocketServer, type Socket as TSocket } from 'socket.io';

type Constructor = {
    logger: Logger;
};

class Socket implements SocketService {
    private _io!: SocketServer;
    private logger: Logger;

    public get io(): SocketServer {
        return this._io;
    }

    constructor({ logger }: Constructor) {
        this.logger = logger;
    }

    public initializeIo = (server: Server): void => {
        this._io = new SocketServer(server);
        this._io
            .of(SocketNamespace.NOTIFICATION)
            .on(SocketEvent.CONNECTION, (socket) => {
                this.logger.info(`Socket client connected: ${socket.id}`);
                this.notificationHandler(socket);
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
