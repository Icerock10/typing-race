import { type Server } from 'node:http';
import { type GameStore } from '~/features/game-store/base-game-store.module.js';
import { LobbyHandler } from '~/features/lobby/lobby-handler.module.js';
import { config } from '../config/config.js';
import { type UserDto } from '~/libs/types/types.js';
import { type SocketService } from './libs/types/types.js';
import { SocketEvent, SocketNamespace } from './libs/enums/enums.js';
import { type BaseToken } from '../token/base-token.module.js';
import { type UserService } from '~/features/users/user.service.js';
import { type Logger } from '../logger/libs/types/logger.type.js';
import { Server as SocketServer, type Socket as TSocket } from 'socket.io';
import { AuthorizationError } from '~/libs/enums/enums.js';

type Constructor = {
    logger: Logger;
    userService: UserService;
    store: GameStore;
    tokenService: BaseToken;
};

class Socket implements SocketService {
    private _io!: SocketServer;
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
        this._io
            .of(SocketNamespace.NOTIFICATION)
            .on(SocketEvent.CONNECTION, (socket) => {
                this.logger.info(`Socket client connected: ${socket.id}`);
                this.notificationHandler(socket);
            });
        this._io
            .of(SocketNamespace.LOBBY)
            .on(SocketEvent.CONNECTION, (socket) => {
                this.logger.info(
                    `[Socket connected to]: ${SocketNamespace.LOBBY} ${socket.id}`,
                );
                void this.handleHandShake(socket);
                this.initLobbyHandler(socket);
            });
    };

    private handleHandShake = async (socket: TSocket): Promise<void> => {
        try {
            const token = socket.handshake.auth['token'] as string;
            const { userId } = await this.tokenService.decode(token);

            const userData = await this.userService.find(userId);
            if (!userData || !socket.connected) {
                throw new AuthorizationError();
            }

            (socket.data as Record<'user', UserDto>).user = userData;
            this.store.addUser(socket.id, userId);
        } catch {
            socket.disconnect();
        }
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
